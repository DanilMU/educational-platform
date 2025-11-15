import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
	@ApiProperty({
		example: 'TypeScript is a superset of JavaScript.',
		description: 'The text of the answer'
	})
	@IsString()
	@IsNotEmpty()
	text!: string;

	@ApiProperty({
		example: true,
		description: 'Whether this answer is the correct one'
	})
	@IsBoolean()
	isCorrect!: boolean;
}
