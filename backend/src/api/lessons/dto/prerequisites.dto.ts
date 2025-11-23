import { ApiProperty } from '@nestjs/swagger';

export class PrerequisitesDto {
	@ApiProperty({
		description: 'ID урока, для которого запрашиваются зависимости',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	lessonId!: string;

	@ApiProperty({
		description: 'Список уроков, которые нужно пройти перед текущим',
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
				description: {
					type: 'string',
					example: 'Базовые концепции JavaScript'
				}
			}
		}
	})
	requiredLessons!: Array<{
		id: string;
		title: string;
		description?: string;
	}>;
}
