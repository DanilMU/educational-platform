import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({
		example: 'john@example.com',
		description: 'Email address of the user',
		required: false
	})
	@IsEmail()
	@IsOptional()
	public email?: string;

	@ApiProperty({
		example: 'strongPassword123',
		description: 'Password for the account',
		required: false
	})
	@MinLength(8, {
		message: 'Password must be at least 8 characters long'
	})
	@IsString()
	@IsOptional()
	public password?: string;

	@ApiProperty({
		example: 'John',
		description: 'First name of the user',
		required: false
	})
	@IsString()
	@IsOptional()
	public firstName?: string;

	@ApiProperty({
		example: 'Doe',
		description: 'Last name of the user',
		required: false
	})
	@IsString()
	@IsOptional()
	public lastName?: string;

	@ApiProperty({
		example: 'https://example.com/avatar.png',
		description: 'URL of the user avatar',
		required: false
	})
	@IsString()
	@IsOptional()
	public avatarUrl?: string;
}
