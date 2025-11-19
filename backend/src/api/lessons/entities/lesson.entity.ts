import { ApiProperty } from '@nestjs/swagger';

export class Lesson {
	@ApiProperty({
		description: 'Уникальный идентификатор урока',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'Название урока',
		example: 'Введение в NestJS'
	})
	title!: string;

	@ApiProperty({
		description: 'Содержание урока в формате HTML или Markdown',
		example: '<h1>Заголовок</h1><p>Содержание...</p>'
	})
	content!: string;

	@ApiProperty({
		description: 'ID темы, к которой относится урок',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	topicId!: string;

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
