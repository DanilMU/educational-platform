import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator';

import { UpdateAnswerDto } from './update-answer.dto';

export class UpdateQuestionDto {
	@ApiProperty({
		example: 'clxvf2nci0006v0zwf1h3a1z7',
		description: 'The unique ID of the question',
		required: false
	})
	@IsString()
	@IsOptional()
	id?: string;

	@ApiProperty({
		example: 'What is TypeScript?',
		description: 'The text of the question',
		required: false
	})
	@IsString()
	@IsOptional()
	text?: string;

	@ApiProperty({
		example: QuestionType.SINGLE_CHOICE,
		enum: QuestionType,
		description: 'The type of the question',
		required: false
	})
	@IsEnum(QuestionType)
	@IsOptional()
	type?: QuestionType;

	@ApiProperty({
		type: () => [UpdateAnswerDto],
		description: 'A list of possible answers for the question',
		required: false
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateAnswerDto)
	@IsOptional()
	answers?: UpdateAnswerDto[];
}
