import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
	@ApiProperty({
		example: 'clxvf2nci0005v0zwf1h3a1z6',
		description: 'The unique ID of the answer',
		required: false
	})
	@IsString()
	@IsOptional()
	id?: string;

	@ApiProperty({
		example: 'TypeScript is a superset of JavaScript.',
		description: 'The text of the answer',
		required: false
	})
	@IsString()
	@IsOptional()
	text?: string;

	@ApiProperty({
		example: true,
		description: 'Whether this answer is the correct one',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	isCorrect?: boolean;
}
