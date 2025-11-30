import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { SubjectStatus } from '../entities/subject.entity';

import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
	@ApiProperty({
		description: 'Статус курса',
		enum: SubjectStatus,
		required: false,
		nullable: true
	})
	@IsEnum(SubjectStatus)
	@IsOptional()
	status?: SubjectStatus;
}
