import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { Topic } from '../../topics/entities/topic.entity';

export class PaginatedTopicsDto extends PaginatedResponseDto<Topic> {
	@ApiProperty({ type: [Topic] })
	data: Topic[] = [];
}
