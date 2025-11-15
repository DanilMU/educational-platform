import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { UserAnswerDto } from './user-answer.dto';

export class SubmitQuizDto {
	@ApiProperty({
		type: () => [UserAnswerDto],
		description: 'A list of user answers for the quiz'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserAnswerDto)
	answers!: UserAnswerDto[];
}
