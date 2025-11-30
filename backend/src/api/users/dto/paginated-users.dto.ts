import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { User } from '../../users/entities/user.entity';

export class PaginatedUsersDto extends PaginatedResponseDto<User> {
	@ApiProperty({ type: [User] })
	data: User[] = [];
}
