import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
	@ApiProperty({
		description: 'Уникальный идентификатор уведомления',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id?: string;

	@ApiProperty({
		description: 'ID пользователя, которому отправляется уведомление',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'Тип уведомления',
		enum: [
			'lesson-completed',
			'quiz-result',
			'recommendation',
			'course-completed',
			'deadline-reminder'
		],
		example: 'lesson-completed'
	})
	type!:
		| 'lesson-completed'
		| 'quiz-result'
		| 'recommendation'
		| 'course-completed'
		| 'deadline-reminder';

	@ApiProperty({
		description: 'Заголовок уведомления',
		example: 'Урок завершен'
	})
	title!: string;

	@ApiProperty({
		description: 'Содержание уведомления',
		example: 'Вы успешно завершили урок "Введение в JavaScript"'
	})
	message!: string;

	@ApiProperty({
		description: 'Дополнительные данные уведомления',
		type: 'object',
		additionalProperties: true,
		nullable: true,
		example: {
			lessonId: 'clx1z2y3y000v0zwabcdef',
			lessonTitle: 'Введение в JavaScript',
			completionDate: '2025-11-18T12:00:00.000Z'
		}
	})
	data?: Record<string, unknown> | null;

	@ApiProperty({
		description: 'Статус прочтения уведомления',
		example: false
	})
	isRead!: boolean;

	@ApiProperty({
		description: 'Дата создания уведомления',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	createdAt!: Date;

	@ApiProperty({
		description: 'Дата последнего обновления уведомления',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	updatedAt!: Date;
}
