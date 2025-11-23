import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateProgressDto {
	@ApiProperty({
		example: true,
		description: 'Whether the lesson is completed',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;

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
