import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateLessonDto, UpdateLessonDto } from './dto';
import { LessonDescriptionDto } from './dto/lesson-description.dto';
import { PrerequisitesDto } from './dto/prerequisites.dto';

@Injectable()
export class LessonsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createLessonDto: CreateLessonDto) {
		return this.prisma.lesson.create({ data: createLessonDto });
	}

	findAll() {
		return this.prisma.lesson.findMany();
	}

	findOne(id: string) {
		console.log(`Searching for lesson with ID: ${id}`);
		return this.prisma.lesson.findUnique({ where: { id } });
	}

	update(id: string, updateLessonDto: UpdateLessonDto) {
		return this.prisma.lesson.update({
			where: { id },
			data: updateLessonDto
		});
	}

	remove(id: string) {
		return this.prisma.lesson.delete({ where: { id } });
	}

	async getLessonDescription(id: string): Promise<LessonDescriptionDto> {
		const lesson = await this.prisma.lesson.findUnique({
			where: { id }
		});

		if (!lesson) {
			throw new Error(`Lesson with ID ${id} not found`);
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
			throw new Error(`Lesson with ID ${id} not found`);
		}

		// For now, return an empty array as prerequisites
		// In a more complex implementation, we would determine actual prerequisites
		return {
			lessonId: id,
			requiredLessons: []
		};
	}
}
