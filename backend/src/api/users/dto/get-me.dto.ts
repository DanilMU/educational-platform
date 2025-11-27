import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class GetMeDto {
	@ApiProperty({
		example: 'clx15753m000o4t2ahn53dfg',
		description: 'User ID'
	})
	public id!: string;

	@ApiProperty({
		example: 'John',
		description: 'First name of the user',
		type: String,
		nullable: true
	})
	public firstName?: string;

	@ApiProperty({
		example: 'Doe',
		description: 'Last name of the user',
		type: String,
		nullable: true
	})
	public lastName?: string;

	@ApiProperty({
		example: 'john@example.com',
		description: 'Email address of the user'
	})
	public email!: string;

	@ApiProperty({
		enum: Role,
		example: Role.STUDENT,
		description: 'User role'
	})
	public role!: Role;

	@ApiProperty({
		example: 'https://example.com/avatar.jpg',
		description: 'Avatar URL',
		type: String,
		nullable: true
	})
	public avatarUrl?: string;

	@ApiProperty({
		example: true,
		description: 'Whether the user receives notifications'
	})
	public receiveNotifications!: boolean;

	@ApiProperty({
		example: '2023-01-01T00:00:00.000Z',
		description: 'Creation date'
	})
	public createdAt!: string;

	@ApiProperty({
		example: '2023-01-01T00:00:00.000Z',
		description: 'Update date'
	})
	public updatedAt!: string;
}
