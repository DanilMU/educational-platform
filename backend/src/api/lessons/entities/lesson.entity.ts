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
		description: 'Ориентировочное время прохождения урока в минутах',
		example: 30,
		required: false
	})
	estimatedTime?: number;

	@ApiProperty({
		description: 'Сложность урока от 1 до 5',
		example: 3,
		required: false
	})
	difficulty?: number;

	@ApiProperty({
		description: 'Цели обучения',
		example: 'Изучить основы NestJS',
		required: false
	})
	learningObjectives?: string;

	@ApiProperty({
		description: 'Требования для прохождения урока',
		example: 'Знание JavaScript',
		required: false
	})
	prerequisites?: string;

	@ApiProperty({
		description: 'Ссылка на видеоурок',
		example: 'https://www.youtube.com/watch?v=example',
		required: false
	})
	videoUrl?: string;

	@ApiProperty({
		description: 'Список вложений (PDF, документы и т.д.)',
		example: ['/uploads/file1.pdf', '/uploads/file2.zip'],
		required: false
	})
	attachments?: string[];

	@ApiProperty({
		description: 'Порядковый номер урока в теме',
		example: 1,
		required: false
	})
	order?: number;

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
