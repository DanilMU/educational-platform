import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

	@ApiProperty({
		example: 8,
		description: 'The number of correct answers'
	})
	@IsNumber()
	correctAnswers!: number;

	@ApiProperty({
		example: 2,
		description: 'The number of incorrect answers'
	})
	@IsNumber()
	incorrectAnswers!: number;

	@ApiProperty({
		example: 'Great job!',
		description: 'A message based on the user s performance'
	})
	@IsString()
	message!: string;
}
