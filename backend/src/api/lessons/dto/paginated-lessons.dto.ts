import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { Lesson } from '../../lessons/entities/lesson.entity';

export class PaginatedLessonsDto extends PaginatedResponseDto<Lesson> {
	@ApiProperty({ type: [Lesson] })
	data: Lesson[] = [];
}
