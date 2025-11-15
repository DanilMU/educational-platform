import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

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
}
