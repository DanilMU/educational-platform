import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
	@ApiProperty({
		example: 'Introduction to Fire Safety',
		description: 'The title of the topic'
	})
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({
		example: 'clxvf2nci0001v0zwf1h3a1z2',
		description: 'The ID of the subject this topic belongs to'
	})
	@IsString()
	@IsNotEmpty()
	subjectId!: string;

	@ApiProperty({
		example: 'clxvf2nci0007v0zwf1h3a1z8',
		description: 'The ID of the parent topic, if this is a sub-topic',
		required: false
	})
	@IsString()
	@IsOptional()
	parentId?: string;

	@ApiProperty({
		example: ['/uploads/file1.pdf', '/uploads/file2.zip'],
		description: 'List of URLs to attachments',
		required: false
	})
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	attachments?: string[];
}
