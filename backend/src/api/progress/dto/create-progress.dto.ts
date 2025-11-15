import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
}
