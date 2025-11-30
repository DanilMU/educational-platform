import { ConflictException, Injectable } from '@nestjs/common';
import { Lesson, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateLessonDto, UpdateLessonDto } from './dto';
import { LessonDescriptionDto } from './dto/lesson-description.dto';
import { PrerequisitesDto } from './dto/prerequisites.dto';

@Injectable()
export class LessonsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createLessonDto: CreateLessonDto) {
		try {
			return this.prisma.lesson.create({ data: createLessonDto });
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

	findAll(
		skip: number,
		take: number
	): Promise<{ lessons: Lesson[]; total: number }> {
		return this.prisma
			.$transaction([
				this.prisma.lesson.findMany({
					skip: isNaN(skip) ? undefined : skip,
					take: isNaN(take) ? undefined : take
				}),
				this.prisma.lesson.count()
			])
			.then(([lessons, total]) => ({ lessons, total }));
	}

	findOne(id: string) {
		try {
			console.log(`Searching for lesson with ID: ${id}`);
			return this.prisma.lesson.findUnique({ where: { id } });
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

	update(id: string, updateLessonDto: UpdateLessonDto) {
		try {
			return this.prisma.lesson.update({
				where: { id },
				data: updateLessonDto
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

	remove(id: string) {
		try {
			return this.prisma.lesson.delete({ where: { id } });
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

	async getLessonDescription(id: string): Promise<LessonDescriptionDto> {
		const lesson = await this.prisma.lesson.findUnique({
			where: { id }
		});

		if (!lesson) {
			throw new ConflictException('Lesson not found');
		}

		return {
			lesson: {
				...lesson,
				estimatedTime: lesson.estimatedTime ?? undefined,
				difficulty: lesson.difficulty ?? undefined,
				learningObjectives: lesson.learningObjectives ?? undefined,
				prerequisites: lesson.prerequisites ?? undefined,
				videoUrl: lesson.videoUrl ?? undefined,
				attachments: lesson.attachments ?? undefined,
				order: lesson.order ?? undefined
			},
			learningObjectives: lesson.learningObjectives ?? undefined,
			prerequisites: lesson.prerequisites ?? undefined,
			estimatedTime: lesson.estimatedTime ?? undefined,
			difficulty: lesson.difficulty ?? undefined,
			attachments: lesson.attachments ?? undefined
		};
	}

	async getLessonPrerequisites(id: string): Promise<PrerequisitesDto> {
		const lesson = await this.prisma.lesson.findUnique({
			where: { id },
			include: {
				topic: {
					include: {
						subject: true
					}
				}
			}
		});

		if (!lesson) {
			throw new ConflictException('Lesson not found');
		}

		// For now, return an empty array as prerequisites
		// In a more complex implementation, we would determine actual prerequisites
		return {
			lessonId: id,
			requiredLessons: []
		};
	}
}
