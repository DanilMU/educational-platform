import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { SubjectStatus } from '../entities/subject.entity';

export class UpdateSubjectStatusDto {
	@ApiProperty({
		description: 'Статус курса',
		enum: SubjectStatus,
		example: SubjectStatus.PUBLISHED
	})
	@IsEnum(SubjectStatus)
	status!: SubjectStatus;
}
