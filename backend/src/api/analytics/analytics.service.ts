import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { AnalyticsDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserAnalytics(userId: string): Promise<AnalyticsDto> {
		const userProgress = await this.prisma.userProgress.findMany({
			where: {
				userId: userId
			},
			include: {
				lesson: {
					include: {
						topic: {
							select: {
								id: true,
								title: true
							}
						}
					}
				}
			}
		});

		const totalLessons = await this.prisma.lesson.count();
		const lessonsCompleted = userProgress.filter(p => p.isCompleted).length;
		const totalProgress =
			totalLessons > 0
				? Math.round((lessonsCompleted / totalLessons) * 100)
				: 0;

		const totalTimeSpent = userProgress.reduce(
			(sum, p) => sum + (p.timeSpent || 0),
			0
		);
		const averageTimePerLesson =
			lessonsCompleted > 0
				? Math.round(totalTimeSpent / lessonsCompleted)
				: 0;

		const quizScores = userProgress
			.filter(p => p.score !== null)
			.map(p => p.score as number);
		const averageQuizScore =
			quizScores.length > 0
				? Math.round(
						quizScores.reduce((sum, score) => sum + score, 0) /
							quizScores.length
					)
				: 0;
		const quizSuccessRate =
			quizScores.length > 0
				? Math.round(
						(quizScores.filter(score => score >= 70).length /
							quizScores.length) *
							100
					)
				: 0;

		// Strong and weak areas (Optimized to remove N+1 query)
		const topicScores: { [topicId: string]: { scores: number[]; title: string } } = {};
		userProgress.forEach(p => {
			if (p.score !== null) {
				const topic = p.lesson.topic;
				if (!topicScores[topic.id]) {
					topicScores[topic.id] = { scores: [], title: topic.title };
				}
				topicScores[topic.id].scores.push(p.score as number);
			}
		});

		const strongAreas: string[] = [];
		const weakAreas: string[] = [];
		for (const topicId in topicScores) {
			const { scores, title } = topicScores[topicId];
			const avgScore =
				scores.reduce((sum, score) => sum + score, 0) / scores.length;
			if (avgScore >= 80) {
				strongAreas.push(title);
			} else if (avgScore < 70) {
				weakAreas.push(title);
			}
		}

		return {
			userId,
			totalProgress,
			totalTimeSpent,
			averageTimePerLesson,
			lessonsCompleted,
			totalLessons,
			quizSuccessRate,
			averageQuizScore,
			strongAreas,
			weakAreas,
			generatedAt: new Date()
		};
	}

	async getTimeSpent(userId: string): Promise<{ timeSpent: number }> {
		const result = await this.prisma.userProgress.aggregate({
			_sum: {
				timeSpent: true
			},
			where: {
				userId: userId
			}
		});

		return { timeSpent: result._sum.timeSpent || 0 };
	}

	async getSuccessRate(userId: string): Promise<{ successRate: number }> {
		const totalQuizzes = await this.prisma.userProgress.count({
			where: {
				userId: userId,
				score: {
					not: null
				}
			}
		});

		if (totalQuizzes === 0) {
			return { successRate: 0 };
		}

		const successfulQuizzes = await this.prisma.userProgress.count({
			where: {
				userId: userId,
				score: {
					gte: 70
				}
			}
		});

		const successRate = Math.round(
			(successfulQuizzes / totalQuizzes) * 100
		);

		return { successRate };
	}

	async getPopularLessons(
		courseId: string
	): Promise<{ lessonId: string; completions: number }[]> {
		const result = await this.prisma.userProgress.groupBy({
			by: ['lessonId'],
			where: {
				lesson: {
					topic: {
						subjectId: courseId
					}
				},
				isCompleted: true
			},
			_count: {
				lessonId: true
			},
			orderBy: {
				_count: {
					lessonId: 'desc'
				}
			}
		});

		return result.map(item => ({
			lessonId: item.lessonId,
			completions: item._count.lessonId
		}));
	}
}
