import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserAnswerDto {
	@ApiProperty({
		example: 'clxvf2nci0006v0zwf1h3a1z7',
		description: 'The ID of the question being answered'
	})
	@IsString()
	@IsNotEmpty()
	questionId!: string;

	@ApiProperty({
		example: ['clxvf2nci0005v0zwf1h3a1z6'],
		description: 'An array of answer IDs selected by the user'
	})
	@IsArray()
	@IsString({ each: true })
	answerIds!: string[];
}
