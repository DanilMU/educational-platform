import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
	@ApiProperty({
		example: 'Occupational Safety',
		description: 'The title of the subject'
	})
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({
		example: 'A comprehensive course on occupational safety standards.',
		description: 'A brief description of the subject',
		required: false
	})
	@IsString()
	@IsOptional()
	description?: string;
}
