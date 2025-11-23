import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested
} from 'class-validator';

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

	@ApiProperty({
		example: 10,
		description: 'Time limit for the quiz in minutes',
		required: false
	})
	@IsInt()
	@IsOptional()
	timeLimit?: number;

	@ApiProperty({
		example: 3,
		description: 'Maximum number of attempts allowed',
		required: false,
		default: 3
	})
	@IsInt()
	@IsOptional()
	maxAttempts?: number;

	@ApiProperty({
		example: 70,
		description: 'Passing score in percentage',
		required: false,
		default: 70
	})
	@IsInt()
	@Min(0)
	@Max(100)
	@IsOptional()
	passingScore?: number;

	@ApiProperty({
		example: false,
		description: 'Whether to shuffle questions',
		required: false,
		default: false
	})
	@IsBoolean()
	@IsOptional()
	shuffleQuestions?: boolean;

	@ApiProperty({
		example: false,
		description: 'Whether to shuffle answers',
		required: false,
		default: false
	})
	@IsBoolean()
	@IsOptional()
	shuffleAnswers?: boolean;
}
