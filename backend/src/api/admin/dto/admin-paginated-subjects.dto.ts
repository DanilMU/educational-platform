import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

import { AdminSubject } from '../entities/admin-subject.entity';

export class AdminPaginatedSubjectsDto extends PaginatedResponseDto<AdminSubject> {
	@ApiProperty({ type: [AdminSubject] })
	declare data: AdminSubject[];
}
