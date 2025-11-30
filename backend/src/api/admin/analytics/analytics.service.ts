import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { AnalyticsDto } from './dto/analytics.dto';
import { CourseAnalyticsDto } from './dto/course-analytics.dto';
import { UserProgressOverTimeDto } from './dto/user-progress-over-time.dto';

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
		const topicScores: {
			[topicId: string]: { scores: number[]; title: string };
		} = {};
		userProgress.forEach(p => {
			if (p.score !== null) {
				const topic = p.lesson.topic;
				if (!topicScores[topic.id]) {
					topicScores[topic.id] = { scores: [], title: topic.title };
				}
				topicScores[topic.id].scores.push(p.score);
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

	async getCourseAnalytics(courseId: string): Promise<CourseAnalyticsDto> {
		const uniqueUsers = await this.prisma.userProgress.groupBy({
			by: ['userId'],
			where: {
				lesson: {
					topic: {
						subjectId: courseId
					}
				}
			}
		});
		const totalStudents = uniqueUsers.length;

		const completedLessonsCount = await this.prisma.userProgress.count({
			where: {
				lesson: {
					topic: {
						subjectId: courseId
					}
				},
				isCompleted: true
			}
		});

		const totalLessonsInCourse = await this.prisma.lesson.count({
			where: {
				topic: {
					subjectId: courseId
				}
			}
		});

		const averageCompletionRate =
			totalLessonsInCourse > 0 && totalStudents > 0
				? (completedLessonsCount /
						(totalLessonsInCourse * totalStudents)) *
					100
				: 0;

		const quizScores = await this.prisma.userProgress.findMany({
			where: {
				lesson: {
					topic: {
						subjectId: courseId
					}
				},
				score: {
					not: null
				}
			},
			select: {
				score: true
			}
		});

		const totalScore = quizScores.reduce(
			(sum, entry) => sum + (entry.score || 0),
			0
		);
		const averageScore =
			quizScores.length > 0 ? totalScore / quizScores.length : 0;

		return {
			courseId,
			numberOfStudents: totalStudents,
			averageCompletionRate: parseFloat(averageCompletionRate.toFixed(2)),
			averageScore: parseFloat(averageScore.toFixed(2))
		};
	}

	async getUserProgressOverTime(
		userId: string,
		months: number = 6
	): Promise<UserProgressOverTimeDto> {
		const monthlyProgress: { name: string; progress: number }[] = [];
		const now = new Date();

		for (let i = months - 1; i >= 0; i--) {
			const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
			const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

			const monthName = date.toLocaleString('ru-RU', { month: 'short' });

			const completedLessonsInMonth = await this.prisma.userProgress.count({
				where: {
					userId: userId,
					isCompleted: true,
					completedAt: {
						gte: date,
						lt: nextMonth,
					},
				},
			});

			const totalLessonsCount = await this.prisma.lesson.count();
			const progress =
				totalLessonsCount > 0
					? Math.round((completedLessonsInMonth / totalLessonsCount) * 100)
					: 0;

			monthlyProgress.push({ name: monthName, progress });
		}

		return {
			userId,
			monthlyProgress,
		};
	}
}
