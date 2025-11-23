import { ApiProperty } from '@nestjs/swagger';

export class LearningPathDto {
	@ApiProperty({
		description: 'ID курса, для которого строится путь обучения',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	subjectId!: string;

	@ApiProperty({
		description: 'Название курса',
		example: 'Основы программирования на JavaScript'
	})
	subjectTitle!: string;

	@ApiProperty({
		description: 'Описание курса',
		example:
			'Полный курс по основам программирования на JavaScript для начинающих разработчиков',
		required: false
	})
	subjectDescription?: string;

	@ApiProperty({
		description: 'Список тем в курсе с уроками',
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
				lessons: {
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
								example: 'Установка окружения'
							},
							order: {
								type: 'number',
								example: 1
							},
							estimatedTime: {
								type: 'number',
								example: 30
							},
							difficulty: {
								type: 'number',
								example: 2
							}
						}
					}
				}
			}
		}
	})
	topics!: Array<{
		id: string;
		title: string;
		lessons: Array<{
			id: string;
			title: string;
			order: number;
			estimatedTime?: number;
			difficulty?: number;
		}>;
	}>;
}
