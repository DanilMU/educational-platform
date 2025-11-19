import { ApiProperty } from '@nestjs/swagger';

export class Progress {
	@ApiProperty({
		description: 'Уникальный идентификатор прогресса',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'ID пользователя',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'ID урока',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	lessonId!: string;

	@ApiProperty({ description: 'Завершен ли урок', example: true })
	isCompleted!: boolean;

	@ApiProperty({
		description: 'Дата завершения урока',
		type: Date,
		required: false,
		example: '2025-11-18T12:00:00.000Z'
	})
	completedAt?: Date | null;

	@ApiProperty({
		description: 'Дата создания записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	createdAt!: Date;

	@ApiProperty({
		description: 'Дата последнего обновления записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	updatedAt!: Date;
}
