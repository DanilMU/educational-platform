import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
	constructor(private readonly prisma: PrismaService) {}

	async createNotification(
		notificationData: Omit<
			NotificationDto,
			'id' | 'createdAt' | 'updatedAt'
		>
	): Promise<Notification | null> {
		const user = await this.prisma.user.findUnique({
			where: { id: notificationData.userId },
			select: { receiveNotifications: true }
		});

		if (!user || !user.receiveNotifications) {
			return null; // Do not create a notification if the user has opted out
		}

		return this.prisma.notification.create({
			data: {
				userId: notificationData.userId,
				type: notificationData.type,
				title: notificationData.title,
				message: notificationData.message,
				data:
					(notificationData.data as Prisma.InputJsonValue) ||
					undefined,
				isRead: notificationData.isRead || false
			}
		});
	}

	async getUserNotifications(userId: string): Promise<Notification[]> {
		return this.prisma.notification.findMany({
			where: {
				userId: userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	async markAsRead(notificationId: string): Promise<Notification> {
		return this.prisma.notification.update({
			where: {
				id: notificationId
			},
			data: {
				isRead: true
			}
		});
	}

	async deleteNotification(notificationId: string): Promise<void> {
		await this.prisma.notification.delete({
			where: {
				id: notificationId
			}
		});
	}
}
