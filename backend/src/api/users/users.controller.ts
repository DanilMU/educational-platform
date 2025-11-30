import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
	ApiQuery // Add this import
} from '@nestjs/swagger';
import { Role, User as UserModel } from '@prisma/client';
import { Authorized, Protected, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import {
	ChangePasswordDto,
	CreateUserDto,
	GetMeDto,
	UpdateUserDto
} from './dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@Post()
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiOperation({
		summary: 'Создать нового пользователя (только для админов)'
	})
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({
		description: 'Пользователь успешно создан.',
		type: User
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	public async create(@Body() dto: CreateUserDto): Promise<UserModel> {
		return this.usersService.create(dto);
	}

	@Protected()
	@Get('@me')
	@ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
	@ApiOkResponse({
		description: 'Информация о текущем пользователе.',
		type: GetMeDto
	})
	public getMe(@Authorized() user: UserModel): GetMeDto {
		return this.usersService.getMe(user);
	}

	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	@ApiOperation({
		summary: 'Получить всех пользователей (только для админов)'
	})
	@ApiOkResponse({
		description: 'Список всех пользователей.',
		type: PaginatedUsersDto
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	@ApiQuery({ name: 'skip', required: false, type: String, description: 'Количество пропускаемых элементов' }) // Add this
	@ApiQuery({ name: 'take', required: false, type: String, description: 'Количество возвращаемых элементов' }) // Add this
	public async getAllUsers(
		@Query('skip') skip: string,
		@Query('take') take: string
	): Promise<{ users: UserModel[]; total: number }> {
		return this.usersService.getAllUsers(+skip, +take);
	}

	@Protected()
	@Patch('@me')
	@ApiOperation({ summary: 'Обновить информацию о текущем пользователе' })
	@ApiBody({ type: UpdateUserDto })
	@ApiOkResponse({
		description: 'Информация о пользователе успешно обновлена.',
		type: User
	})
	public async updateMe(
		@Authorized() user: UserModel,
		@Body() dto: UpdateUserDto
	): Promise<UserModel> {
		try {
			const result = await this.usersService.updateMe(user.id, dto);
			return result;
		} catch (error) {
			console.error(
				'Ошибка в контроллере при обновлении профиля:',
				error
			);
			throw error;
		}
	}

	@Protected()
	@Patch('@me/password')
	@ApiOperation({ summary: 'Изменить пароль текущего пользователя' })
	@ApiBody({ type: ChangePasswordDto })
	@ApiOkResponse({
		description: 'Пароль успешно изменен.'
	})
	public async changePassword(
		@Authorized() user: UserModel,
		@Body() dto: ChangePasswordDto
	): Promise<{ message: string }> {
		return await this.usersService.changePassword(
			user.id,
			dto.currentPassword,
			dto.newPassword
		);
	}

	@Patch(':id')
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiOperation({
		summary: 'Обновить пользователя по ID (только для админов)'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiBody({ type: UpdateUserDto })
	@ApiOkResponse({
		description: 'Пользователь успешно обновлен.',
		type: User
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateUserDto
	): Promise<UserModel> {
		return this.usersService.update(id, dto);
	}

	@Delete(':id')
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiTags('Users')
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Удалить пользователя по ID (только для админов)'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({ description: 'Пользователь успешно удален.', type: User })
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	public async remove(@Param('id') id: string): Promise<UserModel> {
		return this.usersService.remove(id);
	}
}
