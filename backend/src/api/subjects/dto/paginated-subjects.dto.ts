import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { Subject } from '../entities/subject.entity';

export class PaginatedSubjectsDto extends PaginatedResponseDto<Subject> {
	@ApiProperty({ type: [Subject] })
	declare data: Subject[];
}
