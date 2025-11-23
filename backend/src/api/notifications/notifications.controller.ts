import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Authorized } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards';

import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post()
	@ApiOperation({ summary: 'Создать новое уведомление' })
	@ApiOkResponse({
		description: 'Уведомление создано.',
		type: NotificationDto
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	createNotification(
		@Body()
		notificationData: Omit<
			NotificationDto,
			'id' | 'createdAt' | 'updatedAt'
		>
	) {
		return this.notificationsService.createNotification(notificationData);
	}

	@Post('recommendation')
	@ApiOperation({ summary: 'Создать уведомление с рекомендацией' })
	@ApiOkResponse({
		description: 'Уведомление создано.',
		type: NotificationDto
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	createRecommendationNotification(
		@Body()
		notificationData: Omit<
			NotificationDto,
			'id' | 'createdAt' | 'updatedAt' | 'type'
		>
	) {
		return this.notificationsService.createNotification({
			...notificationData,
			type: 'recommendation'
		});
	}

	@Get('users/:id')
	@ApiOperation({ summary: 'Получить все уведомления для пользователя' })
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Список уведомлений пользователя.',
		type: [NotificationDto]
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	getUserNotifications(@Param('id') userId: string) {
		return this.notificationsService.getUserNotifications(userId);
	}

	@Get('current-user')
	@ApiOperation({
		summary:
			'Получить уведомления для текущего авторизованного пользователя'
	})
	@ApiOkResponse({
		description: 'Список уведомлений текущего пользователя.',
		type: [NotificationDto]
	})
	getCurrentUserNotifications(@Authorized('id') userId: string) {
		return this.notificationsService.getUserNotifications(userId);
	}

	@Post(':id/read')
	@ApiOperation({ summary: 'Отметить уведомление как прочитанное' })
	@ApiParam({ name: 'id', description: 'ID уведомления', type: String })
	@ApiOkResponse({
		description: 'Уведомление отмечено как прочитанное.',
		type: NotificationDto
	})
	@ApiNotFoundResponse({ description: 'Уведомление не найдено.' })
	markAsRead(@Param('id') notificationId: string) {
		return this.notificationsService.markAsRead(notificationId);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удалить уведомление' })
	@ApiParam({ name: 'id', description: 'ID уведомления', type: String })
	@ApiOkResponse({
		description: 'Уведомление удалено.'
	})
	@ApiNotFoundResponse({ description: 'Уведомление не найдено.' })
	deleteNotification(@Param('id') notificationId: string) {
		return this.notificationsService.deleteNotification(notificationId);
	}
}
