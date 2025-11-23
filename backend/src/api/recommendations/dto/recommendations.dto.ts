import { ApiProperty } from '@nestjs/swagger';

export class RecommendationsDto {
	@ApiProperty({
		description: 'ID пользователя, для которого генерируются рекомендации',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'Список рекомендованных уроков',
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					example: 'clx1z2y3y0000v0zwabcdef'
				},
				title: {
					type: 'string',
					example: 'Введение в JavaScript'
				},
				subject: {
					type: 'string',
					example: 'Основы программирования'
				},
				topic: {
					type: 'string',
					example: 'Основы JavaScript'
				},
				estimatedTime: {
					type: 'number',
					example: 30
				},
				difficulty: {
					type: 'number',
					example: 2
				},
				reason: {
					type: 'string',
					example: 'Следующий урок в теме'
				}
			}
		}
	})
	recommendations!: Array<{
		id: string;
		title: string;
		subject: string;
		topic: string;
		estimatedTime?: number;
		difficulty?: number;
		reason: string;
	}>;

	@ApiProperty({
		description: 'Дата генерации рекомендаций',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	generatedAt!: Date;
}
