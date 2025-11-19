import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
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
	ApiTags
} from '@nestjs/swagger';
import { Role, User as UserModel } from '@prisma/client';
import { Authorized, Protected, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateUserDto, GetMeDto, UpdateUserDto } from './dto';
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

	@Protected()
	@Get('@me')
	@ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
	@ApiOkResponse({
		description: 'Информация о текущем пользователе.',
		type: User
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
		type: [User]
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	public async getAllUsers(): Promise<UserModel[]> {
		return this.usersService.getAllUsers();
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
		return this.usersService.updateMe(user.id, dto);
	}
}
