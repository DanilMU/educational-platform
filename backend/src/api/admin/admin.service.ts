import { ConflictException, Injectable } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateLessonDto, UpdateLessonDto } from '../lessons/dto';
import { CreateSubjectDto, UpdateSubjectDto } from '../subjects/dto';
import { CreateTopicDto, UpdateTopicDto } from '../topics/dto';
import { CreateUserDto, UpdateUserDto } from '../users/dto';

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}

	async getDashboardData() {
		const [totalUsers, activeUsers, totalCourses, totalLessons] =
			await Promise.all([
				this.prisma.user.count(),
				this.prisma.userProgress.count({
					where: { isCompleted: true }
				}),
				this.prisma.subject.count(),
				this.prisma.lesson.count()
			]);

		return {
			totalUsers,
			activeUsers,
			totalCourses,
			totalLessons
		};
	}

	async getUserAnalytics(period: string) {
		// Логика получения аналитики пользователей
		return {};
	}

	async getCourseAnalytics() {
		// Логика получения аналитики курсов
		return {};
	}

	// CRUD для пользователей
	async getAllUsers(skip: number = 0, take: number = 10) {
		// Ограничиваем максимальное количество возвращаемых записей
		const limitedTake = Math.min(take, 100); // Максимум 100 записей за раз

		return this.prisma
			.$transaction([
				this.prisma.user.findMany({
					skip: isNaN(skip) ? 0 : Math.max(0, skip),
					take: isNaN(limitedTake) ? 10 : Math.max(1, limitedTake),
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						role: true,
						avatarUrl: true,
						receiveNotifications: true,
						createdAt: true,
						updatedAt: true
					}
				}),
				this.prisma.user.count()
			])
			.then(([users, total]) => ({ users, total }));
	}

	async getUserById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				avatarUrl: true,
				receiveNotifications: true,
				createdAt: true,
				updatedAt: true
			}
		});
	}

	async createUser(userData: CreateUserDto) {
		const { email, password, role, ...rest } = userData;

		// Проверяем, существует ли пользователь с таким email
		const existingUser = await this.prisma.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			throw new ConflictException('User with this email already exists');
		}

		// Проверяем длину пароля
		if (password && password.length < 8) {
			throw new ConflictException(
				'Password must be at least 8 characters long'
			);
		}

		const argon2 = await import('argon2');
		const hashedPassword = await argon2.hash(password);

		return this.prisma.user.create({
			data: {
				...rest,
				email,
				password: hashedPassword,
				role: role || 'STUDENT'
			}
		});
	}

	async updateUser(id: string, userData: UpdateUserDto) {
		const data: Partial<UpdateUserDto> = { ...userData };

		if (data.password) {
			const argon2 = await import('argon2');
			data.password = await argon2.hash(data.password);
		}

		try {
			return this.prisma.user.update({
				where: { id },
				data
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'User with this email already exists'
					);
				}
			}
			throw error;
		}
	}

	async deleteUser(id: string) {
		try {
			return this.prisma.user.delete({
				where: { id }
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new ConflictException('User not found');
				}
			}
			throw error;
		}
	}

	// CRUD для курсов
	async getAllCourses(skip: number = 0, take: number = 10) {
		const limitedTake = Math.min(take, 100); // Максимум 100 записей за раз

		// Сначала получаем курсы с полной информацией о темах и уроках
		const [subjects, total] = await this.prisma.$transaction([
			this.prisma.subject.findMany({
				skip: isNaN(skip) ? 0 : Math.max(0, skip),
				take: isNaN(limitedTake) ? 10 : Math.max(1, limitedTake),
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
			this.prisma.subject.count()
		]);

		// Для каждого курса получаем количество тем и уроков
		const subjectsWithStats = await Promise.all(
			subjects.map(async subject => {
				const [topicsCount, lessonsCount] = await Promise.all([
					this.prisma.topic.count({
						where: {
							subjectId: subject.id
						}
					}),
					this.prisma.lesson.count({
						where: {
							topic: {
								subjectId: subject.id
							}
						}
					})
				]);

				return {
					...subject,
					topicsCount,
					lessonsCount
				};
			})
		);

		return { subjects: subjectsWithStats, total };
	}

	async getCourseById(id: string) {
		return this.prisma.subject.findUnique({
			where: { id },
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

	async createCourse(courseData: CreateSubjectDto) {
		try {
			// Устанавливаем статус по умолчанию как PUBLISHED при создании курса
			const data = {
				...courseData,
				status: 'PUBLISHED' as const
			};
			return this.prisma.subject.create({
				data
			});
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

	async updateCourse(id: string, courseData: UpdateSubjectDto) {
		try {
			// Разделяем статус от остальных данных для корректной обработки
			const { status, ...updateData } = courseData;

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

	async updateCourseStatus(id: string, status: $Enums.SubjectStatus) {
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

	async deleteCourse(id: string) {
		try {
			return this.prisma.subject.delete({
				where: { id }
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

	// CRUD для тем
	async getAllTopics(skip: number = 0, take: number = 10) {
		const limitedTake = Math.min(take, 100); // Максимум 100 записей за раз

		return this.prisma
			.$transaction([
				this.prisma.topic.findMany({
					skip: isNaN(skip) ? 0 : Math.max(0, skip),
					take: isNaN(limitedTake) ? 10 : Math.max(1, limitedTake),
					include: {
						subject: true // Включаем информацию о курсе, которому принадлежит тема
					}
				}),
				this.prisma.topic.count()
			])
			.then(([topics, total]) => ({ topics, total }));
	}

	async getTopicById(id: string) {
		return this.prisma.topic.findUnique({
			where: { id },
			include: {
				subject: true
			}
		});
	}

	async createTopic(topicData: CreateTopicDto) {
		return this.prisma.topic.create({
			data: topicData
		});
	}

	async updateTopic(id: string, topicData: UpdateTopicDto) {
		return this.prisma.topic.update({
			where: { id },
			data: topicData
		});
	}

	async deleteTopic(id: string) {
		return this.prisma.topic.delete({
			where: { id }
		});
	}

	// CRUD для уроков
	async getAllLessons(skip: number = 0, take: number = 10) {
		const limitedTake = Math.min(take, 100); // Максимум 100 записей за раз

		return this.prisma
			.$transaction([
				this.prisma.lesson.findMany({
					skip: isNaN(skip) ? 0 : Math.max(0, skip),
					take: isNaN(limitedTake) ? 10 : Math.max(1, limitedTake),
					select: {
						id: true,
						title: true,
						content: true,
						videoUrl: true,
						order: true,
						estimatedTime: true,
						difficulty: true,
						createdAt: true,
						updatedAt: true
					}
				}),
				this.prisma.lesson.count()
			])
			.then(([lessons, total]) => ({ lessons, total }));
	}

	async getLessonById(id: string) {
		return this.prisma.lesson.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				content: true,
				videoUrl: true,
				order: true,
				estimatedTime: true,
				difficulty: true,
				createdAt: true,
				updatedAt: true
			}
		});
	}

	async createLesson(lessonData: CreateLessonDto) {
		try {
			return this.prisma.lesson.create({
				data: lessonData
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					// Foreign key constraint error
					throw new ConflictException('Invalid topic ID provided');
				}
			}
			throw error;
		}
	}

	async updateLesson(id: string, lessonData: UpdateLessonDto) {
		try {
			return this.prisma.lesson.update({
				where: { id },
				data: lessonData
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					// Foreign key constraint error
					throw new ConflictException('Invalid topic ID provided');
				}
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Lesson not found');
				}
			}
			throw error;
		}
	}

	async deleteLesson(id: string) {
		try {
			return this.prisma.lesson.delete({
				where: { id }
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Lesson not found');
				}
			}
			throw error;
		}
	}
}
