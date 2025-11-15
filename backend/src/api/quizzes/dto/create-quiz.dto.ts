import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
	@ApiProperty({
		example: 'Quiz on TypeScript Basics',
		description: 'The title of the quiz'
	})
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({
		example: 'clxvf2nci0003v0zwf1h3a1z4',
		description: 'The ID of the lesson this quiz is for'
	})
	@IsString()
	@IsNotEmpty()
	lessonId!: string;

	@ApiProperty({
		type: () => [CreateQuestionDto],
		description: 'A list of questions for the quiz'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateQuestionDto)
	questions!: CreateQuestionDto[];
}
