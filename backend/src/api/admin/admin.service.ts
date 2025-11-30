import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

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
}
