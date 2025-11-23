import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { LearningPathDto } from '../lessons/dto/learning-path.dto';

@Injectable()
export class LearningPathService {
	constructor(private readonly prisma: PrismaService) {}

	async getLearningPath(subjectId: string): Promise<LearningPathDto> {
		const subject = await this.prisma.subject.findUnique({
			where: { id: subjectId },
			include: {
				topics: {
					include: {
						lessons: {
							orderBy: {
								order: 'asc'
							}
						}
					},
					orderBy: {
						title: 'asc'
					}
				}
			}
		});

		if (!subject) {
			throw new Error(`Subject with ID ${subjectId} not found`);
		}

		const topics = subject.topics.map(topic => ({
			id: topic.id,
			title: topic.title,
			lessons: topic.lessons.map(lesson => ({
				id: lesson.id,
				title: lesson.title,
				order: lesson.order ?? 0,
				estimatedTime: lesson.estimatedTime ?? undefined,
				difficulty: lesson.difficulty ?? undefined
			}))
		}));

		return {
			subjectId: subject.id,
			subjectTitle: subject.title,
			subjectDescription: subject.description || undefined,
			topics
		};
	}
}
