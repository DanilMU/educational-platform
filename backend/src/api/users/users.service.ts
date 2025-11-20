import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
		return this.prismaService.user.update({
			where: { id },
			data: dto
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
			phone: user.phone ?? undefined,
			dob: user.dob ? new Date(user.dob).toISOString() : undefined,
			city: user.city ?? undefined,
			createdAt: new Date(user.createdAt).toISOString(),
			updatedAt: new Date(user.updatedAt).toISOString()
		};
	}

	public async getAllUsers(): Promise<User[]> {
		return this.prismaService.user.findMany();
	}

	public async updateMe(id: string, dto: UpdateUserDto): Promise<User> {
		if (dto.password) {
			dto.password = await hash(dto.password);
		}
		return this.prismaService.user.update({
			where: { id },
			data: dto
		});
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

		// Проверяем текущий пароль
		const isCurrentPasswordValid = await this.validatePassword(
			currentPassword,
			user.password
		);

		if (!isCurrentPasswordValid) {
			throw new Error('Неверный текущий пароль');
		}

		// Хешируем новый пароль
		const hashedNewPassword = await hash(newPassword);

		// Обновляем пароль
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
