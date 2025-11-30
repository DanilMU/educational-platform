import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateUserDto, GetMeDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(dto: CreateUserDto): Promise<User> {
		const { email, password, role, ...rest } = dto;

		const existingUser = await this.prismaService.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			throw new ConflictException('User with this email already exists');
		}

		const hashedPassword = await hash(password);

		return this.prismaService.user.create({
			data: {
				...rest,
				email,
				password: hashedPassword,
				role: role || 'STUDENT' // Use provided role or default to STUDENT
			}
		});
	}

	public async update(id: string, dto: UpdateUserDto): Promise<User> {
		const data: Partial<UpdateUserDto> = { ...dto };

		if (dto.password) {
			data.password = await hash(dto.password);
		}

		try {
			return await this.prismaService.user.update({
				where: { id },
				data
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'Пользователь с таким email уже существует'
					);
				}
			}
			throw error;
		}
	}

	public async remove(id: string): Promise<User> {
		return this.prismaService.user.delete({
			where: { id }
		});
	}

	public getMe(user: User): GetMeDto {
		return {
			id: user.id,
			firstName: user.firstName ?? undefined,
			lastName: user.lastName ?? undefined,
			email: user.email,
			role: user.role,
			avatarUrl: user.avatarUrl ?? undefined,
			receiveNotifications: user.receiveNotifications,
			createdAt: new Date(user.createdAt).toISOString(),
			updatedAt: new Date(user.updatedAt).toISOString()
		};
	}

	public async getAllUsers(
		skip: number,
		take: number
	): Promise<{ users: User[]; total: number }> {
		const [users, total] = await this.prismaService.$transaction([
			this.prismaService.user.findMany({
				skip: isNaN(skip) ? undefined : skip,
				take: isNaN(take) ? undefined : take
			}),
			this.prismaService.user.count()
		]);
		return { users, total };
	}

	public async updateMe(id: string, dto: UpdateUserDto): Promise<User> {
		const dataToUpdate = { ...dto };

		if ('password' in dataToUpdate) {
			delete dataToUpdate.password;
		}

		try {
			const result = await this.prismaService.user.update({
				where: { id },
				data: dataToUpdate
			});
			return result;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'Пользователь с таким email уже существует'
					);
				}
			}
			console.error(
				'Ошибка при обновлении профиля в базе данных:',
				error
			);
			throw error;
		}
	}

	public async changePassword(
		userId: string,
		currentPassword: string,
		newPassword: string
	): Promise<{ message: string }> {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		});

		if (!user) {
			throw new Error('Пользователь не найден');
		}

		const isCurrentPasswordValid = await this.validatePassword(
			currentPassword,
			user.password
		);

		if (!isCurrentPasswordValid) {
			throw new Error('Неверный текущий пароль');
		}

		const hashedNewPassword = await hash(newPassword);

		await this.prismaService.user.update({
			where: { id: userId },
			data: { password: hashedNewPassword }
		});

		return { message: 'Пароль успешно изменен' };
	}

	private async validatePassword(
		plainPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		try {
			return await verify(hashedPassword, plainPassword);
		} catch {
			return false;
		}
	}
}
