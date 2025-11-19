import { ApiProperty } from '@nestjs/swagger';

export class Answer {
	@ApiProperty({
		description: 'Уникальный идентификатор ответа',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'Текст ответа',
		example:
			'Фреймворк для создания эффективных и масштабируемых серверных приложений на Node.js'
	})
	text!: string;

	@ApiProperty({ description: 'Является ли ответ правильным', example: true })
	isCorrect!: boolean;

	@ApiProperty({
		description: 'ID вопроса, к которому относится ответ',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	questionId!: string;

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
