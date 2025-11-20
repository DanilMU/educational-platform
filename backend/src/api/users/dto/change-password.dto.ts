import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({
		example: 'currentPassword123',
		description: 'Текущий пароль пользователя'
	})
	@IsString()
	@MinLength(6, {
		message: 'Текущий пароль должен содержать не менее 6 символов'
	})
	public currentPassword!: string;

	@ApiProperty({
		example: 'newPassword123',
		description: 'Новый пароль пользователя'
	})
	@IsString()
	@MinLength(6, {
		message: 'Новый пароль должен содержать не менее 6 символов'
	})
	public newPassword!: string;
}
