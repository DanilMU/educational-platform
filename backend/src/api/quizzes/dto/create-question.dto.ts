import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsString,
	ValidateNested
} from 'class-validator';

import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
	@ApiProperty({
		example: 'What is TypeScript?',
		description: 'The text of the question'
	})
	@IsString()
	@IsNotEmpty()
	text!: string;

	@ApiProperty({
		example: QuestionType.SINGLE_CHOICE,
		enum: QuestionType,
		description: 'The type of the question'
	})
	@IsEnum(QuestionType)
	type!: QuestionType;

	@ApiProperty({
		type: () => [CreateAnswerDto],
		description: 'A list of possible answers for the question'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateAnswerDto)
	answers!: CreateAnswerDto[];
}
