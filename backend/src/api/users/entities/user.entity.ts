import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class User {
	@ApiProperty({
		description: 'Уникальный идентификатор пользователя',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'Имя пользователя',
		required: false,
		example: 'Анна',
		type: String,
		nullable: true
	})
	firstName?: string | null;

	@ApiProperty({
		description: 'Фамилия пользователя',
		required: false,
		example: 'Иванова',
		type: String,
		nullable: true
	})
	lastName?: string | null;

	@ApiProperty({
		description: 'Адрес электронной почты',
		example: 'anna.ivanova@example.com'
	})
	email!: string;

	@ApiProperty({
		description: 'Роль пользователя',
		enum: Role,
		example: Role.STUDENT
	})
	role!: Role;

	@ApiProperty({
		description: 'URL аватара',
		required: false,
		example: 'https://example.com/avatars/anna.png',
		type: String,
		nullable: true
	})
	avatarUrl?: string | null;

	@ApiProperty({
		description: 'Получает ли пользователь уведомления',
		example: true
	})
	receiveNotifications!: boolean;

	@ApiProperty({
		description: 'Дата создания записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	createdAt!: Date;

	@ApiProperty({
		description: 'Дата последнего обновления записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	updatedAt!: Date;
}
