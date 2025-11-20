import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MinLength,
	IsPhoneNumber,
	IsDateString
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		example: 'john@example.com',
		description: 'Email address of the user'
	})
	@IsEmail()
	public email!: string;

	@ApiProperty({
		example: 'strongPassword123',
		description: 'Password for the account'
	})
	@MinLength(8, {
		message: 'Password must be at least 8 characters long'
	})
	@IsString()
	public password!: string;

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
		example: '+79991234567',
		description: 'Phone number of the user',
		required: false
	})
	@IsPhoneNumber()
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
		example: Role.STUDENT,
		enum: Role,
		description: 'The role of the user',
		required: false
	})
	@IsEnum(Role)
	@IsOptional()
	public role?: Role;
}
