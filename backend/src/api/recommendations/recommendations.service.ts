import { Injectable } from '@nestjs/common';
import { Lesson } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { RecommendationsDto } from './dto/recommendations.dto';

type RecommendedLesson = Lesson & {
	reason: string;
	topic: {
		subject: {
			id: string;
			title: string;
		};
		title: string;
	};
};

@Injectable()
export class RecommendationsService {
	constructor(private readonly prisma: PrismaService) {}

	async getRecommendationsForUser(
		userId: string
	): Promise<RecommendationsDto> {
		const userProgress = await this.prisma.userProgress.findMany({
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
						},
						quiz: true
					}
				}
			}
		});

		const allLessons = await this.prisma.lesson.findMany({
			include: {
				topic: {
					include: {
						subject: true
					}
				}
			},
			orderBy: {
				order: 'asc'
			}
		});

		const completedLessonIds = new Set(
			userProgress.filter(p => p.isCompleted).map(p => p.lessonId)
		);

		const uncompletedLessons = allLessons.filter(
			lesson => !completedLessonIds.has(lesson.id)
		);

		// Analyze performance by topic
		const topicPerformance: {
			[topicId: string]: {
				scores: number[];
				title: string;
				subjectId: string;
			};
		} = {};
		for (const progress of userProgress) {
			if (progress.score !== null && progress.lesson.quiz) {
				const topic = progress.lesson.topic;
				if (!topicPerformance[topic.id]) {
					topicPerformance[topic.id] = {
						scores: [],
						title: topic.title,
						subjectId: topic.subjectId
					};
				}
				topicPerformance[topic.id].scores.push(progress.score);
			}
		}

		const weakTopics = new Set<string>();
		const strongTopics = new Set<string>();
		for (const topicId in topicPerformance) {
			const { scores } = topicPerformance[topicId];
			const avgScore =
				scores.reduce((sum, score) => sum + score, 0) / scores.length;
			if (avgScore < 70) {
				weakTopics.add(topicId);
			} else if (avgScore >= 95) {
				strongTopics.add(topicId);
			}
		}

		let recommendedLessons: RecommendedLesson[] = [];

		// Priority 1: Remedial path for weak topics
		if (weakTopics.size > 0) {
			recommendedLessons = uncompletedLessons
				.filter(
					lesson =>
						weakTopics.has(lesson.topicId) &&
						(lesson.difficulty ?? 0) <= 2
				)
				.map(
					lesson =>
						({
							...lesson,
							reason: 'Рекомендуется для закрепления материала по теме, с которой возникли сложности.'
						}) as RecommendedLesson
				);
			if (recommendedLessons.length > 0) {
				// We have a recommendation, let's stop here
				return this.formatRecommendations(userId, recommendedLessons);
			}
		}

		// Priority 2: Fast-track for strong topics
		if (strongTopics.size > 0) {
			const lastStrongLesson = userProgress
				.filter(p => strongTopics.has(p.lesson.topicId))
				.sort(
					(a, b) =>
						(b.completedAt?.getTime() ?? 0) -
						(a.completedAt?.getTime() ?? 0)
				)[0]?.lesson;

			if (lastStrongLesson) {
				const allTopicsInSubject = await this.prisma.topic.findMany({
					where: { subjectId: lastStrongLesson.topic.subjectId },
					orderBy: { title: 'asc' }
				});
				const currentTopicIndex = allTopicsInSubject.findIndex(
					t => t.id === lastStrongLesson.topicId
				);
				if (
					currentTopicIndex > -1 &&
					currentTopicIndex < allTopicsInSubject.length - 1
				) {
					const nextTopic = allTopicsInSubject[currentTopicIndex + 1];
					const fastTrackLesson = uncompletedLessons.find(
						l =>
							l.topicId === nextTopic.id &&
							(l.difficulty ?? 0) >= 3
					);
					if (fastTrackLesson) {
						recommendedLessons.push({
							...fastTrackLesson,
							reason: 'Отличная работа! Попробуйте этот более сложный урок, чтобы двигаться вперед.'
						});
						return this.formatRecommendations(
							userId,
							recommendedLessons
						);
					}
				}
			}
		}

		// Priority 3: Standard path
		const lastCompletedLesson = userProgress
			.filter(p => p.isCompleted)
			.sort(
				(a, b) =>
					(b.completedAt?.getTime() ?? 0) -
					(a.completedAt?.getTime() ?? 0)
			)[0]?.lesson;

		if (lastCompletedLesson) {
			const nextLessonInTopic = uncompletedLessons.find(
				l =>
					l.topicId === lastCompletedLesson.topicId &&
					(l.order ?? 0) > (lastCompletedLesson.order ?? 0)
			);
			if (nextLessonInTopic) {
				recommendedLessons.push({
					...nextLessonInTopic,
					reason: 'Следующий урок в текущей теме.'
				});
			}
		}

		// Fallback to the very first uncompleted lesson if no other logic fits
		if (recommendedLessons.length === 0 && uncompletedLessons.length > 0) {
			recommendedLessons.push({
				...uncompletedLessons[0],
				reason: 'Следующий урок в вашем учебном плане.'
			});
		}

		return this.formatRecommendations(userId, recommendedLessons);
	}

	private formatRecommendations(
		userId: string,
		lessons: RecommendedLesson[]
	): RecommendationsDto {
		const recommendations = lessons.slice(0, 3).map(lesson => ({
			id: lesson.topic.subject.id, // Используем ID курса, а не урока
			title: lesson.topic.subject.title, // Используем название курса
			subject: lesson.topic.subject.title,
			topic: lesson.topic.title,
			estimatedTime: lesson.estimatedTime || undefined,
			difficulty: lesson.difficulty || undefined,
			reason: lesson.reason
		}));

		return {
			userId,
			recommendations,
			generatedAt: new Date()
		};
	}
}
