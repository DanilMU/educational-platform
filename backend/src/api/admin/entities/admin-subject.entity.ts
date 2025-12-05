import { ApiProperty } from '@nestjs/swagger';
import { SubjectStatus } from '@prisma/client';

export class AdminSubject {
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

	@ApiProperty({
		description: 'Статус курса',
		enum: SubjectStatus,
		example: SubjectStatus.PUBLISHED,
		default: SubjectStatus.PUBLISHED
	})
	status!: SubjectStatus;

	// Note: topics are generally not included in AdminSubject for brevity in admin lists,
	// but can be fetched separately for detailed views. If needed, this can be changed.
	// @ApiProperty({ description: 'Список тем в предмете', type: [Topic] })
	// topics!: Topic[];

	@ApiProperty({
		description: 'Количество тем в предмете',
		example: 5
	})
	topicsCount!: number;

	@ApiProperty({
		description: 'Количество уроков в предмете',
		example: 20
	})
	lessonsCount!: number;

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
