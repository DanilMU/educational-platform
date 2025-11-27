import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDateString,
	IsOptional,
	IsString
} from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		example: '+79991234567',
		description: 'Phone number of the user',
		required: false
	})
	@IsString()
	@IsOptional()
	public phone?: string;

	@ApiProperty({
		example: '1995-06-15',
		description: 'Date of birth of the user',
		required: false
	})
	@IsDateString()
	@IsOptional()
	public dob?: string;

	@ApiProperty({
		example: 'Москва',
		description: 'City of the user',
		required: false
	})
	@IsString()
	@IsOptional()
	public city?: string;

	@ApiProperty({
		example: true,
		description: 'Whether the user wants to receive notifications',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	public receiveNotifications?: boolean;
}
