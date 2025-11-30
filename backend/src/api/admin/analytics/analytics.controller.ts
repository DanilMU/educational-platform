import {
	Controller,
	ForbiddenException,
	Get,
	Param,
	UseGuards
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Authorized, GetUser, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { AnalyticsService } from './analytics.service';
import { AnalyticsDto, CourseAnalyticsDto, UserProgressOverTimeDto } from './dto';

// Corrected import for CourseAnalyticsDto

@ApiTags('Admin Analytics')
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Get('users/:id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		summary:
			'Получить статистику обучения: время, прогресс, сильные/слабые стороны'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Аналитика для пользователя.',
		type: AnalyticsDto
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	getUserAnalytics(@Param('id') id: string) {
		return this.analyticsService.getUserAnalytics(id);
	}

	@Get('current-user')
	@ApiOperation({
		summary: 'Получить аналитику для текущего авторизованного пользователя'
	})
	@ApiOkResponse({
		description: 'Аналитика для текущего пользователя.',
		type: AnalyticsDto
	})
	getCurrentUserAnalytics(@Authorized('id') userId: string) {
		return this.analyticsService.getUserAnalytics(userId);
	}

	@Get('user/:id/time-spent')
	@ApiOperation({
		summary: 'Получить время, потраченное на обучение'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Время, потраченное на обучение.',
		schema: {
			type: 'object',
			properties: {
				timeSpent: {
					type: 'number'
				}
			}
		}
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	getTimeSpent(@Param('id') id: string, @GetUser() user: User) {
		if (user.id !== id && user.role !== Role.ADMIN) {
			throw new ForbiddenException(
				'У вас нет прав на просмотр этой аналитики.'
			);
		}
		return this.analyticsService.getTimeSpent(id);
	}

	@Get('user/:id/success-rate')
	@ApiOperation({
		summary: 'Получить успешность прохождения тестов'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Успешность прохождения тестов.',
		schema: {
			type: 'object',
			properties: {
				successRate: {
					type: 'number'
				}
			}
		}
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	getSuccessRate(@Param('id') id: string, @GetUser() user: User) {
		if (user.id !== id && user.role !== Role.ADMIN) {
			throw new ForbiddenException(
				'У вас нет прав на просмотр этой аналитики.'
			);
		}
		return this.analyticsService.getSuccessRate(id);
	}

	@Get('user/:id/progress-over-time')
	@ApiOperation({
		summary: 'Получить прогресс пользователя по месяцам за последние 6 месяцев'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Прогресс пользователя по месяцам.',
		type: UserProgressOverTimeDto
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async getUserProgressOverTime(@Param('id') id: string, @GetUser() user: User) {
		if (user.id !== id && user.role !== Role.ADMIN) {
			throw new ForbiddenException(
				'У вас нет прав на просмотр этой аналитики.'
			);
		}
		return this.analyticsService.getUserProgressOverTime(id);
	}

	@Get('course/:id/popular-lessons')
	@ApiOperation({
		summary: 'Получить популярные уроки в курсе'
	})
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({
		description: 'Популярные уроки в курсе.',
		schema: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					lessonId: {
						type: 'string'
					},
					completions: {
						type: 'number'
					}
				}
			}
		}
	})
	@ApiNotFoundResponse({ description: 'Курс не найден.' })
	getPopularLessons(@Param('id') id: string) {
		return this.analyticsService.getPopularLessons(id);
	}

	@Get('courses/:id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		summary: 'Получить аналитику для конкретного курса (только для админов)'
	})
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({
		description: 'Аналитика для курса.',
		type: CourseAnalyticsDto
	})
	@ApiNotFoundResponse({ description: 'Курс не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	getCourseAnalytics(@Param('id') id: string) {
		return this.analyticsService.getCourseAnalytics(id);
	}
}
