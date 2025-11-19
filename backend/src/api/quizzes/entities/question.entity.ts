import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

import { Answer } from './answer.entity';

export class Question {
	@ApiProperty({
		description: 'Уникальный идентификатор вопроса',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({ description: 'Текст вопроса', example: 'Что такое NestJS?' })
	text!: string;

	@ApiProperty({
		description: 'Тип вопроса',
		enum: QuestionType,
		example: QuestionType.SINGLE_CHOICE
	})
	type!: QuestionType;

	@ApiProperty({
		description: 'ID теста, к которому относится вопрос',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	quizId!: string;

	@ApiProperty({
		description: 'Список ответов на вопрос',
		type: [Answer]
	})
	answers!: Answer[];

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
