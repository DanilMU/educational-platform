import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompleteSubjectDto {
	@ApiProperty({
		example: 'clxvf2nci0000v0zwf1h3a1z1',
		description: 'The ID of the user'
	})
	@IsNotEmpty()
	@IsString()
	userId!: string;

	@ApiProperty({
		example: 'clxvf2nci0001v0zwf1h3a1z2',
		description: 'The ID of the subject'
	})
	@IsNotEmpty()
	@IsString()
	subjectId!: string;
}
