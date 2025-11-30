import { Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
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
		return this.prisma.subject.create({ data: createSubjectDto });
	}

	findAll(
		skip: number = 0,
		take: number = 10
	): Promise<{ subjects: Subject[]; total: number }> {
		return this.prisma
			.$transaction([
				this.prisma.subject.findMany({
					skip: isNaN(skip) || skip < 0 ? 0 : skip,
					take: isNaN(take) || take < 0 ? 10 : take
				}),
				this.prisma.subject.count()
			])
			.then(([subjects, total]) => ({ subjects, total }));
	}

	findOne(id: string) {
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

	update(id: string, updateSubjectDto: UpdateSubjectDto) {
		return this.prisma.subject.update({
			where: { id },
			data: updateSubjectDto
		});
	}

	remove(id: string) {
		return this.prisma.subject.delete({ where: { id } });
	}

	getLearningPath(id: string) {
		return this.learningPathService.getLearningPath(id);
	}

	async findByUserId(userId: string): Promise<Subject[]> {
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

		// Получаем уникальные курсы из прогресса пользователя
		const subjectsMap = new Map<string, Subject>();
		progress.forEach(item => {
			const subject = item.lesson.topic.subject;
			if (!subjectsMap.has(subject.id)) {
				subjectsMap.set(subject.id, {
					id: subject.id,
					title: subject.title,
					description: subject.description,
					createdAt: subject.createdAt,
					updatedAt: subject.updatedAt
				});
			}
		});
		return Array.from(subjectsMap.values());
	}
}
