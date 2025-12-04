import { ConflictException, Injectable } from '@nestjs/common';
import { $Enums, Prisma, Subject } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { LearningPathService } from '../learning-path/learning-path.service';

import {
	CreateSubjectDto,
	PaginatedSubjectsDto,
	UpdateSubjectDto
} from './dto';

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

	async findAll(
		skip: number = 0,
		take: number = 10,
		includeDrafts: boolean = false
	): Promise<PaginatedSubjectsDto> {
		const whereClause = includeDrafts
			? undefined
			: {
					status: 'PUBLISHED' as const
				};

		const [subjects, total] = await this.prisma.$transaction([
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
		]);
		return new PaginatedSubjectsDto(subjects, total);
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
		// Находим курсы, на которые пользователь записан через таблицу enrollments
		const enrollments = await this.prisma.enrollment.findMany({
			where: { userId: userId },
			include: {
				subject: {
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
				}
			}
		});

		// Отбираем только опубликованные курсы
		const enrolledSubjects = enrollments
			.map(enrollment => enrollment.subject)
			.filter(subject => subject.status === 'PUBLISHED');
		
		return enrolledSubjects;
	}

	async enrollUserInSubject(userId: string, subjectId: string) {
		// Проверяем, существует ли курс
		const subject = await this.prisma.subject.findUnique({
			where: { id: subjectId }
		});

		if (!subject) {
			throw new ConflictException(
				`Subject with ID ${subjectId} not found`
			);
		}

		if (subject.status !== 'PUBLISHED') {
			throw new ConflictException('Subject is not published');
		}

		// Проверяем, не записан ли уже пользователь на этот курс
		const existingEnrollment = await this.prisma.enrollment.findUnique({
			where: {
				userId_subjectId: {
					userId,
					subjectId
				}
			}
		});

		if (existingEnrollment) {
			// Если уже записан, просто возвращаем курс
			return this.prisma.subject.findUnique({
				where: { id: subjectId },
				include: {
					topics: {
						include: {
							lessons: {
								include: {
									quiz: true,
								},
							},
						},
					},
				},
			});
		}

		// Создаем запись в таблице Enrollment
		await this.prisma.enrollment.create({
			data: {
				userId,
				subjectId,
			},
		});

		// Возвращаем обновленный курс
		return await this.prisma.subject.findUnique({
			where: { id: subjectId },
			include: {
				topics: {
					include: {
						lessons: {
							include: {
								quiz: true,
							},
						},
					},
				},
			},
		});
	}
}
