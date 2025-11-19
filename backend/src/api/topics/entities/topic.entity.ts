import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from 'src/api/lessons/entities/lesson.entity';

export class Topic {
	@ApiProperty({
		description: 'Уникальный идентификатор темы',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({ description: 'Название темы', example: 'Настройка проекта' })
	title!: string;

	@ApiProperty({
		description: 'ID предмета, к которому относится тема',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	subjectId!: string;

	@ApiProperty({ description: 'Список уроков в теме', type: [Lesson] })
	lessons!: Lesson[];

	@ApiProperty({
		description: 'ID родительской темы (для иерархии)',
		required: false,
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	parentId?: string | null;

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
