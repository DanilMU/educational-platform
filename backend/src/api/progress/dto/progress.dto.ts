import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class ProgressDto {
	@ApiProperty({
		example: 'clxvf2nci0004v0zwf1h3a1z5',
		description: 'The unique ID of the progress record'
	})
	@IsString()
	id!: string;

	@ApiProperty({
		example: 'clxvf2nci0000v0zwf1h3a1z1',
		description: 'The ID of the user'
	})
	@IsString()
	userId!: string;

	@ApiProperty({
		example: 'clxvf2nci0003v0zwf1h3a1z4',
		description: 'The ID of the lesson'
	})
	@IsString()
	lessonId!: string;

	@ApiProperty({
		example: true,
		description: 'Whether the lesson is completed'
	})
	@IsBoolean()
	isCompleted!: boolean;

	@ApiProperty({
		example: '2025-11-15T10:00:00.000Z',
		description: 'The date and time when the lesson was completed',
		nullable: true
	})
	@IsDate()
	@IsOptional()
	completedAt!: Date | null;

	@ApiProperty({
		example: '2025-11-15T09:00:00.000Z',
		description: 'The date and time when the progress record was created'
	})
	@IsDate()
	createdAt!: Date;

	@ApiProperty({
		example: '2025-11-15T10:00:00.000Z',
		description: 'The date and time when the progress record was last updated'
	})
	@IsDate()
	updatedAt!: Date;
}
