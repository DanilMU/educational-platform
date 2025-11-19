import { ApiProperty } from '@nestjs/swagger';

import { Question } from './question.entity';

export class Quiz {
	@ApiProperty({
		description: 'Уникальный идентификатор теста',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'Название теста',
		example: 'Тест по основам NestJS'
	})
	title!: string;

	@ApiProperty({
		description: 'ID урока, к которому относится тест',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	lessonId!: string;

	@ApiProperty({
		description: 'Список вопросов в тесте',
		type: [Question]
	})
	questions!: Question[];

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
