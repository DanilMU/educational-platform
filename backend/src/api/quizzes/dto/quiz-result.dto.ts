import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class QuizResultDto {
	@ApiProperty({
		example: 8,
		description: 'The number of correct answers'
	})
	@IsNumber()
	score!: number;

	@ApiProperty({
		example: 10,
		description: 'The total number of questions in the quiz'
	})
	@IsNumber()
	totalQuestions!: number;
}
