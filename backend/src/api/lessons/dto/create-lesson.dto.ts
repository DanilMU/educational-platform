import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
	@ApiProperty({
		example: 'Introduction to TypeScript',
		description: 'The title of the lesson'
	})
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({
		example: '<p>TypeScript is a typed superset of JavaScript.</p>',
		description: 'The content of the lesson in HTML format'
	})
	@IsString()
	@IsNotEmpty()
	content!: string;

	@ApiProperty({
		example: 'clxvf2nci0002v0zwf1h3a1z3',
		description: 'The ID of the topic this lesson belongs to'
	})
	@IsString()
	@IsNotEmpty()
	topicId!: string;
}
