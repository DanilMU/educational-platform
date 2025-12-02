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
import { CreateQuizDto, UpdateQuizDto } from '../quizzes/dto';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { CreateSubjectDto, UpdateSubjectDto } from '../subjects/dto';
import { UpdateSubjectStatusDto } from '../subjects/dto/update-subject-status.dto';
import { Subject } from '../subjects/entities/subject.entity';
import { CreateTopicDto, UpdateTopicDto } from '../topics/dto';
import { Topic } from '../topics/entities/topic.entity';
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

	@Patch('courses/:id/status')
	@ApiOperation({ summary: 'Обновить статус курса' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiBody({ type: UpdateSubjectStatusDto })
	@ApiOkResponse({ description: 'Статус курса обновлен', type: Subject })
	@ApiNotFoundResponse({ description: 'Курс не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateCourseStatus(
		@Param('id') id: string,
		@Body() updateStatusDto: UpdateSubjectStatusDto
	) {
		return this.adminService.updateCourseStatus(id, updateStatusDto.status);
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

	// CRUD для тем
	@Get('topics')
	@ApiOperation({ summary: 'Получить список тем админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список тем', type: [Topic] })
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
	async getTopics(@Query('skip') skip: string, @Query('take') take: string) {
		return this.adminService.getAllTopics(+skip, +take);
	}

	@Get('topics/:id')
	@ApiOperation({ summary: 'Получить тему по ID' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiOkResponse({ description: 'Данные темы', type: Topic })
	@ApiNotFoundResponse({ description: 'Тема не найдена' })
	async getTopicById(@Param('id') id: string) {
		return this.adminService.getTopicById(id);
	}

	@Post('topics')
	@ApiOperation({ summary: 'Создать новую тему' })
	@ApiBearerAuth()
	@ApiBody({ type: CreateTopicDto })
	@ApiCreatedResponse({ description: 'Тема создана', type: Topic })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async createTopic(@Body() topicData: CreateTopicDto) {
		return this.adminService.createTopic(topicData);
	}

	@Patch('topics/:id')
	@ApiOperation({ summary: 'Обновить тему' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiBody({ type: UpdateTopicDto })
	@ApiOkResponse({ description: 'Тема обновлена', type: Topic })
	@ApiNotFoundResponse({ description: 'Тема не найдена' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateTopic(
		@Param('id') id: string,
		@Body() topicData: UpdateTopicDto
	) {
		return this.adminService.updateTopic(id, topicData);
	}

	@Delete('topics/:id')
	@ApiOperation({ summary: 'Удалить тему' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiOkResponse({ description: 'Тема удалена', type: Topic })
	@ApiNotFoundResponse({ description: 'Тема не найдена' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async deleteTopic(@Param('id') id: string) {
		return this.adminService.deleteTopic(id);
	}

	// CRUD для тестов
	@Get('quizzes')
	@ApiOperation({ summary: 'Получить список тестов админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список тестов', type: [Quiz] })
	async getQuizzes() {
		return this.adminService.getAllQuizzes();
	}

	@Get('quizzes/:id')
	@ApiOperation({ summary: 'Получить тест по ID' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiOkResponse({ description: 'Данные теста', type: Quiz })
	@ApiNotFoundResponse({ description: 'Тест не найден' })
	async getQuizById(@Param('id') id: string) {
		return this.adminService.getQuizById(id);
	}

	@Post('quizzes')
	@ApiOperation({ summary: 'Создать новый тест' })
	@ApiBearerAuth()
	@ApiBody({ type: CreateQuizDto })
	@ApiCreatedResponse({ description: 'Тест создан', type: Quiz })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async createQuiz(@Body() quizData: CreateQuizDto) {
		return this.adminService.createQuiz(quizData);
	}

	@Patch('quizzes/:id')
	@ApiOperation({ summary: 'Обновить тест' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiBody({ type: UpdateQuizDto })
	@ApiOkResponse({ description: 'Тест обновлен', type: Quiz })
	@ApiNotFoundResponse({ description: 'Тест не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async updateQuiz(@Param('id') id: string, @Body() quizData: UpdateQuizDto) {
		return this.adminService.updateQuiz(id, quizData);
	}

	@Delete('quizzes/:id')
	@ApiOperation({ summary: 'Удалить тест' })
	@ApiBearerAuth()
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiOkResponse({ description: 'Тест удален', type: Quiz })
	@ApiNotFoundResponse({ description: 'Тест не найден' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async deleteQuiz(@Param('id') id: string) {
		return this.adminService.deleteQuiz(id);
	}
}
