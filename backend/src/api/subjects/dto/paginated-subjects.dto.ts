import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '@prisma/client';

import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';

export class PaginatedSubjectsDto extends PaginatedResponseDto<Subject> {
	@ApiProperty({ type: [Object] })
	data: Subject[] = [];
}
