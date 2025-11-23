import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	Min
} from 'class-validator';

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

	@ApiProperty({
		example: 30,
		description: 'Estimated time to complete the lesson in minutes',
		required: false
	})
	@IsInt()
	@IsOptional()
	estimatedTime?: number;

	@ApiProperty({
		example: 3,
		description: 'Difficulty of the lesson from 1 to 5',
		required: false
	})
	@IsInt()
	@Min(1)
	@Max(5)
	@IsOptional()
	difficulty?: number;

	@ApiProperty({
		example: 'Learn the basics of TypeScript',
		description: 'Learning objectives for the lesson',
		required: false
	})
	@IsString()
	@IsOptional()
	learningObjectives?: string;

	@ApiProperty({
		example: 'Basic knowledge of JavaScript',
		description: 'Prerequisites for the lesson',
		required: false
	})
	@IsString()
	@IsOptional()
	prerequisites?: string;

	@ApiProperty({
		example: 'https://www.youtube.com/watch?v=12345',
		description: 'URL to a video lesson',
		required: false
	})
	@IsUrl()
	@IsOptional()
	videoUrl?: string;

	@ApiProperty({
		example: ['/uploads/file1.pdf', '/uploads/file2.zip'],
		description: 'List of URLs to attachments',
		required: false
	})
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	attachments?: string[];

	@ApiProperty({
		example: 1,
		description: 'Order of the lesson within the topic',
		required: false
	})
	@IsInt()
	@IsOptional()
	order?: number;
}
