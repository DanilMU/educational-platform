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
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateLessonDto, UpdateLessonDto } from '../lessons/dto';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateSubjectDto, UpdateSubjectDto } from '../subjects/dto';
import { Subject } from '../subjects/entities/subject.entity';
import { CreateUserDto, UpdateUserDto } from '../users/dto';
import { User } from '../users/entities/user.entity';

import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('dashboard')
	@ApiOperation({ summary: 'Получить данные для дашборда админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Данные дашборда' })
	async getDashboard() {
		return this.adminService.getDashboardData();
	}

	// CRUD для пользователей
	@Get('users')
	@ApiOperation({ summary: 'Получить список пользователей админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список пользователей', type: [User] })
	@ApiQuery({
		name: 'skip',
		required: false,
		type: String,
		description: 'Количество пропускаемых элементов'
	})
	@ApiQuery({
		name: 'take',
		required: false,
		type: String,
		description: 'Количество возвращаемых элементов'
	})
	async getUsers(@Query('skip') skip: string, @Query('take') take: string) {
		return this.adminService.getAllUsers(+skip, +take);
	}

	@Get('users/:id')
	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({ description: 'Данные пользователя', type: User })
	@ApiNotFoundResponse({ description: 'Пользователь не найден' })
	async getUserById(@Param('id') id: string) {
		return this.adminService.getUserById(id);
	}

	@Post('users')
	@ApiOperation({ summary: 'Создать нового пользователя' })
	@ApiBearerAuth()
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({ description: 'Пользователь создан', type: User })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async createUser(@Body() userData: CreateUserDto) {
		return this.adminService.createUser(userData);
	}

	@Patch('users/:id')
	@ApiOperation({ summary: 'Обновить пользователя' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiBody({ type: UpdateUserDto })
	@ApiOkResponse({ description: 'Пользователь обновлен', type: User })
	@ApiNotFoundResponse({ description: 'Пользователь не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
		return this.adminService.updateUser(id, userData);
	}

	@Delete('users/:id')
	@ApiOperation({ summary: 'Удалить пользователя' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({ description: 'Пользователь удален', type: User })
	@ApiNotFoundResponse({ description: 'Пользователь не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async deleteUser(@Param('id') id: string) {
		return this.adminService.deleteUser(id);
	}

	// CRUD для курсов
	@Get('courses')
	@ApiOperation({ summary: 'Получить список курсов админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список курсов', type: [Subject] })
	@ApiQuery({
		name: 'skip',
		required: false,
		type: String,
		description: 'Количество пропускаемых элементов'
	})
	@ApiQuery({
		name: 'take',
		required: false,
		type: String,
		description: 'Количество возвращаемых элементов'
	})
	async getCourses(@Query('skip') skip: string, @Query('take') take: string) {
		return this.adminService.getAllCourses(+skip, +take);
	}

	@Get('courses/:id')
	@ApiOperation({ summary: 'Получить курс по ID' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({ description: 'Данные курса', type: Subject })
	@ApiNotFoundResponse({ description: 'Курс не найден' })
	async getCourseById(@Param('id') id: string) {
		return this.adminService.getCourseById(id);
	}

	@Post('courses')
	@ApiOperation({ summary: 'Создать новый курс' })
	@ApiBearerAuth()
	@ApiBody({ type: CreateSubjectDto })
	@ApiCreatedResponse({ description: 'Курс создан', type: Subject })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async createCourse(@Body() courseData: CreateSubjectDto) {
		return this.adminService.createCourse(courseData);
	}

	@Patch('courses/:id')
	@ApiOperation({ summary: 'Обновить курс' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiBody({ type: UpdateSubjectDto })
	@ApiOkResponse({ description: 'Курс обновлен', type: Subject })
	@ApiNotFoundResponse({ description: 'Курс не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateCourse(
		@Param('id') id: string,
		@Body() courseData: UpdateSubjectDto
	) {
		return this.adminService.updateCourse(id, courseData);
	}

	@Delete('courses/:id')
	@ApiOperation({ summary: 'Удалить курс' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({ description: 'Курс удален', type: Subject })
	@ApiNotFoundResponse({ description: 'Курс не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async deleteCourse(@Param('id') id: string) {
		return this.adminService.deleteCourse(id);
	}

	// CRUD для уроков
	@Get('lessons')
	@ApiOperation({ summary: 'Получить список уроков админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список уроков', type: [Lesson] })
	@ApiQuery({
		name: 'skip',
		required: false,
		type: String,
		description: 'Количество пропускаемых элементов'
	})
	@ApiQuery({
		name: 'take',
		required: false,
		type: String,
		description: 'Количество возвращаемых элементов'
	})
	async getLessons(@Query('skip') skip: string, @Query('take') take: string) {
		return this.adminService.getAllLessons(+skip, +take);
	}

	@Get('lessons/:id')
	@ApiOperation({ summary: 'Получить урок по ID' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({ description: 'Данные урока', type: Lesson })
	@ApiNotFoundResponse({ description: 'Урок не найден' })
	async getLessonById(@Param('id') id: string) {
		return this.adminService.getLessonById(id);
	}

	@Post('lessons')
	@ApiOperation({ summary: 'Создать новый урок' })
	@ApiBearerAuth()
	@ApiBody({ type: CreateLessonDto })
	@ApiCreatedResponse({ description: 'Урок создан', type: Lesson })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async createLesson(@Body() lessonData: CreateLessonDto) {
		return this.adminService.createLesson(lessonData);
	}

	@Patch('lessons/:id')
	@ApiOperation({ summary: 'Обновить урок' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiBody({ type: UpdateLessonDto })
	@ApiOkResponse({ description: 'Урок обновлен', type: Lesson })
	@ApiNotFoundResponse({ description: 'Урок не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateLesson(
		@Param('id') id: string,
		@Body() lessonData: UpdateLessonDto
	) {
		return this.adminService.updateLesson(id, lessonData);
	}

	@Delete('lessons/:id')
	@ApiOperation({ summary: 'Удалить урок' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({ description: 'Урок удален', type: Lesson })
	@ApiNotFoundResponse({ description: 'Урок не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async deleteLesson(@Param('id') id: string) {
		return this.adminService.deleteLesson(id);
	}
}
