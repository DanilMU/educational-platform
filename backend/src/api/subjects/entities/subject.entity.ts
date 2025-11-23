import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/api/topics/entities/topic.entity';

export class Subject {
	@ApiProperty({
		description: 'Уникальный идентификатор предмета',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({ description: 'Название предмета', example: 'Охрана труда' })
	title!: string;

	@ApiProperty({
		description: 'Описание предмета',
		required: false,
		example: 'Курс по основам охраны труда на предприятии.'
	})
	description?: string | null;

	@ApiProperty({ description: 'Список тем в предмете', type: [Topic] })
	topics!: Topic[];

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
