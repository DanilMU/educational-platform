import { ConflictException, Injectable } from '@nestjs/common';
import { $Enums, Prisma, Subject } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { LearningPathService } from '../learning-path/learning-path.service';

import { CreateSubjectDto, UpdateSubjectDto } from './dto';

@Injectable()
export class SubjectsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly learningPathService: LearningPathService
	) {}

	create(createSubjectDto: CreateSubjectDto) {
		try {
			// Устанавливаем статус по умолчанию как PUBLISHED при создании курса
			const data = {
				...createSubjectDto,
				status: 'PUBLISHED' as const
			};
			return this.prisma.subject.create({ data });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					// Unique constraint error
					throw new ConflictException(
						'Course with this title already exists'
					);
				}
			}
			throw error;
		}
	}

	findAll(
		skip: number = 0,
		take: number = 10,
		includeDrafts: boolean = false
	): Promise<{ subjects: Subject[]; total: number }> {
		const whereClause = includeDrafts
			? undefined
			: {
					status: 'PUBLISHED' as const
				};

		return this.prisma
			.$transaction([
				this.prisma.subject.findMany({
					skip: isNaN(skip) || skip < 0 ? 0 : skip,
					take: isNaN(take) || take < 0 ? 10 : take,
					where: whereClause,
					include: {
						topics: {
							include: {
								lessons: {
									include: {
										quiz: true
									}
								}
							}
						}
					}
				}),
				this.prisma.subject.count({ where: whereClause })
			])
			.then(([subjects, total]) => ({ subjects, total }));
	}

	findOne(id: string, includeDraft: boolean = false) {
		const whereClause = includeDraft
			? { id }
			: { id, status: 'PUBLISHED' as const };

		return this.prisma.subject.findUnique({
			where: whereClause,
			include: {
				topics: {
					include: {
						lessons: {
							include: {
								quiz: true
							}
						}
					}
				}
			}
		});
	}

	update(id: string, updateSubjectDto: UpdateSubjectDto) {
		try {
			// Разделяем статус от остальных данных для корректной обработки
			const { status, ...updateData } = updateSubjectDto;

			// Если статус предоставлен, обновляем его отдельно
			if (status !== undefined) {
				return this.prisma.subject.update({
					where: { id },
					data: {
						...updateData,
						status: status
					}
				});
			} else {
				// Обновляем только остальные поля без изменения статуса
				return this.prisma.subject.update({
					where: { id },
					data: updateData
				});
			}
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					// Unique constraint error
					throw new ConflictException(
						'Course with this title already exists'
					);
				}
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Course not found');
				}
			}
			throw error;
		}
	}

	remove(id: string) {
		try {
			return this.prisma.subject.delete({ where: { id } });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Course not found');
				}
			}
			throw error;
		}
	}

	updateStatus(id: string, status: $Enums.SubjectStatus) {
		try {
			return this.prisma.subject.update({
				where: { id },
				data: { status }
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Course not found');
				}
			}
			throw error;
		}
	}

	getLearningPath(id: string) {
		return this.learningPathService.getLearningPath(id);
	}

	async findByUserId(userId: string): Promise<Subject[]> {
		// Находим курсы, на которые пользователь записан через прогресс
		const progress = await this.prisma.userProgress.findMany({
			where: {
				userId: userId
			},
			include: {
				lesson: {
					include: {
						topic: {
							include: {
								subject: true
							}
						}
					}
				}
			}
		});

		// Получаем уникальные ID курсов из прогресса пользователя
		const subjectIdsFromProgress = Array.from(
			new Set(
				progress
					.filter(
						item =>
							item.lesson.topic.subject &&
							item.lesson.topic.subject.status === 'PUBLISHED'
					)
					.map(item => item.lesson.topic.subject.id)
			)
		);

		// Также находим курсы, для которых у пользователя есть сертификаты
		const certificates = await this.prisma.certificate.findMany({
			where: {
				userId: userId
			}
		});

		const subjectIdsFromCertificates = certificates.map(
			cert => cert.subjectId
		);

		// Объединяем ID курсов из прогресса и сертификатов
		const allSubjectIds = Array.from(
			new Set([...subjectIdsFromProgress, ...subjectIdsFromCertificates])
		);

		// Возвращаем все опубликованные курсы, на которые пользователь имеет доступ
		if (allSubjectIds.length === 0) {
			return []; // Если нет прогресса и сертификатов, возвращаем пустой массив
		}

		// Загружаем полные данные курсов с темами и уроками
		return await this.prisma.subject.findMany({
			where: {
				id: { in: allSubjectIds },
				status: 'PUBLISHED'
			},
			include: {
				topics: {
					include: {
						lessons: {
							include: {
								quiz: true
							}
						}
					}
				}
			}
		});
	}

	async enrollUserInSubject(userId: string, subjectId: string) {
		// Проверяем, существует ли курс
		const subject = await this.prisma.subject.findUnique({
			where: { id: subjectId },
			include: {
				topics: {
					include: {
						lessons: true
					}
				}
			}
		});

		if (!subject) {
			throw new ConflictException(
				`Subject with ID ${subjectId} not found`
			);
		}

		if (subject.status !== 'PUBLISHED') {
			throw new ConflictException('Subject is not published');
		}

		// Находим первый урок в курсе
		const firstTopic = subject.topics.sort(
			(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
		)[0];

		if (firstTopic && firstTopic.lessons.length > 0) {
			const firstLesson = firstTopic.lessons.sort(
				(a, b) =>
					(a.order || 0) - (b.order || 0) ||
					a.createdAt.getTime() - b.createdAt.getTime()
			)[0];

			if (firstLesson) {
				// Проверяем, есть ли уже прогресс по первому уроку
				const existingProgress =
					await this.prisma.userProgress.findFirst({
						where: {
							userId: userId,
							lessonId: firstLesson.id
						}
					});

				// Создаем запись прогресса для первого урока, если её нет
				if (!existingProgress) {
					await this.prisma.userProgress.create({
						data: {
							userId: userId,
							lessonId: firstLesson.id,
							isCompleted: false,
							score: null,
							timeSpent: 0
						}
					});
				}
			}
		} else {
			// Если у курса нет уроков, мы не можем создать запись прогресса
			// В этом случае пользователь все равно считается записанным на курс
			// так как enrollUserInSubject был вызван успешно
			// Метод findByUserId учитывает сертификаты, которые могут быть
			// использованы для отслеживания участия в курсах без уроков
		}

		// Возвращаем обновленный курс
		return await this.prisma.subject.findUnique({
			where: { id: subjectId },
			include: {
				topics: {
					include: {
						lessons: {
							include: {
								quiz: true
							}
						}
					}
				}
			}
		});
	}
}
