import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';

import {
	CompleteSubjectDto,
	CreateProgressDto,
	ProgressDto,
	UpdateProgressDto
} from './dto';

@Injectable()
export class ProgressService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly notificationsService: NotificationsService
	) {}

	create(
		userId: string,
		createProgressDto: CreateProgressDto
	): Promise<ProgressDto> {
		const { lessonId, isCompleted, score, timeSpent } = createProgressDto;
		return this.prisma.userProgress.create({
			data: {
				userId,
				lessonId,
				isCompleted,
				completedAt: isCompleted ? new Date() : null,
				score,
				timeSpent
			}
		}) as Promise<ProgressDto>;
	}

	findAll(userId: string): Promise<ProgressDto[]> {
		return this.prisma.userProgress.findMany({
			where: { userId }
		}) as Promise<ProgressDto[]>;
	}

	async findOne(
		userId: string,
		lessonId: string
	): Promise<ProgressDto | null> {
		const progress = (await this.prisma.userProgress.findUnique({
			where: {
				userId_lessonId: {
					userId,
					lessonId
				}
			}
		})) as ProgressDto | null;
		return progress;
	}

	update(
		userId: string,
		lessonId: string,
		updateProgressDto: UpdateProgressDto
	): Promise<ProgressDto> {
		const { isCompleted, score, timeSpent } = updateProgressDto;
		return this.prisma.userProgress.upsert({
			where: {
				userId_lessonId: {
					userId,
					lessonId
				}
			},
			update: {
				isCompleted,
				completedAt: isCompleted ? new Date() : null,
				score,
				timeSpent
			},
			create: {
				userId,
				lessonId,
				isCompleted,
				completedAt: isCompleted ? new Date() : null,
				score,
				timeSpent
			}
		}) as Promise<ProgressDto>;
	}

	async remove(userId: string, lessonId: string): Promise<ProgressDto> {
		return this.prisma.userProgress.delete({
			where: {
				userId_lessonId: {
					userId,
					lessonId
				}
			}
		}) as Promise<ProgressDto>;
	}

	async completeAllLessonsInSubject(
		dto: CompleteSubjectDto
	): Promise<{ count: number }> {
		const { userId, subjectId } = dto;

		// Проверяем, существует ли пользователь
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		});
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}

		const subject = await this.prisma.subject.findUnique({
			where: { id: subjectId },
			include: {
				topics: {
					include: {
						lessons: {
							select: {
								id: true
							}
						}
					}
				}
			}
		});
		if (!subject) {
			throw new NotFoundException(
				`Subject with ID ${subjectId} not found`
			);
		}

		const lessonIds = subject.topics.flatMap(
			(topic: { lessons: { id: string }[] }) =>
				topic.lessons.map((lesson: { id: string }) => lesson.id)
		);

		if (lessonIds.length === 0) {
			return { count: 0 }; // No lessons to complete
		}

		const dataToCreate = lessonIds.map((lessonId: string) => ({
			userId,
			lessonId,
			isCompleted: true,
			completedAt: new Date()
		}));

		const result = (await this.prisma.userProgress.createMany({
			data: dataToCreate,
			skipDuplicates: true // Avoids errors if progress already exists
		})) as { count: number };

		return result;
	}
	async markLessonAsCompleted(
		userId: string,
		lessonId: string
	): Promise<ProgressDto> {
		const existingProgress = (await this.prisma.userProgress.findUnique({
			where: {
				userId_lessonId: {
					userId,
					lessonId
				}
			}
		})) as ProgressDto | null;

		let progress: ProgressDto;
		if (existingProgress) {
			progress = (await this.prisma.userProgress.update({
				where: {
					userId_lessonId: {
						userId,
						lessonId
					}
				},
				data: {
					isCompleted: true,
					completedAt: new Date()
				}
			})) as unknown as ProgressDto;
		} else {
			progress = (await this.prisma.userProgress.create({
				data: {
					userId,
					lessonId,
					isCompleted: true,
					completedAt: new Date()
				}
			})) as unknown as ProgressDto;
		}

		// Отправляем уведомление о завершении урока
		try {
			await this.notificationsService.createNotification({
				userId,
				type: 'lesson-completed',
				title: 'Урок завершен',
				message: 'Вы успешно завершили урок',
				data: {
					lessonId,
					completionDate: new Date()
				},
				isRead: false
			});
		} catch (error) {
			// Логируем ошибку, но не прерываем основной процесс
			console.error(
				'Error sending lesson completion notification:',
				error
			);
		}

		return progress;
	}
}
