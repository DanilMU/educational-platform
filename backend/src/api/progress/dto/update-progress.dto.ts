import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProgressDto {
	@ApiProperty({
		example: true,
		description: 'Whether the lesson is completed',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;
}
