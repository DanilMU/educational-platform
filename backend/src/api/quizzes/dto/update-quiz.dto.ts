import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested
} from 'class-validator';

import { UpdateQuestionDto } from './update-question.dto';

export class UpdateQuizDto {
	@ApiProperty({
		example: 'Quiz on TypeScript Basics',
		description: 'The title of the quiz',
		required: false
	})
	@IsString()
	@IsOptional()
	title?: string;

	@ApiProperty({
		type: () => [UpdateQuestionDto],
		description: 'A list of questions for the quiz',
		required: false
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateQuestionDto)
	@IsOptional()
	questions?: UpdateQuestionDto[];

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
		required: false
	})
	@IsInt()
	@IsOptional()
	maxAttempts?: number;

	@ApiProperty({
		example: 70,
		description: 'Passing score in percentage',
		required: false
	})
	@IsInt()
	@Min(0)
	@Max(100)
	@IsOptional()
	passingScore?: number;

	@ApiProperty({
		example: false,
		description: 'Whether to shuffle questions',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	shuffleQuestions?: boolean;

	@ApiProperty({
		example: false,
		description: 'Whether to shuffle answers',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	shuffleAnswers?: boolean;
}
