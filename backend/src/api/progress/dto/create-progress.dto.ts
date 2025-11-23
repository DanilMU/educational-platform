import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	Min
} from 'class-validator';

export class CreateProgressDto {
	@ApiProperty({
		example: 'clxvf2nci0003v0zwf1h3a1z4',
		description: 'The ID of the lesson'
	})
	@IsString()
	@IsNotEmpty()
	lessonId!: string;

	@ApiProperty({
		example: true,
		description: 'Whether the lesson is completed'
	})
	@IsBoolean()
	@IsNotEmpty()
	isCompleted!: boolean;

	@ApiProperty({
		example: 85,
		description: 'Score obtained in the quiz (if any)',
		required: false
	})
	@IsInt()
	@Min(0)
	@Max(100)
	@IsOptional()
	score?: number;

	@ApiProperty({
		example: 25,
		description: 'Time spent on the lesson in minutes',
		required: false
	})
	@IsInt()
	@Min(0)
	@IsOptional()
	timeSpent?: number;
}
