import {
	Body,
	Controller,
	Delete,
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
import { Role } from '@prisma/client';
import { Authorized, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateQuizDto, SubmitQuizDto, UpdateQuizDto } from './dto';
import { Quiz } from './entities/quiz.entity';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
	constructor(private readonly quizzesService: QuizzesService) {}

	@Post()
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiOperation({
		summary: 'Создать новый тест (только для админов/модераторов)'
	})
	@ApiBody({ type: CreateQuizDto })
	@ApiCreatedResponse({ description: 'Тест успешно создан.', type: Quiz })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(@Body() createQuizDto: CreateQuizDto) {
		return this.quizzesService.create(createQuizDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Получить все тесты' })
	@ApiOkResponse({ description: 'Список всех тестов.', type: [Quiz] })
	findAll() {
		return this.quizzesService.findAll();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Найти тест по ID' })
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiOkResponse({ description: 'Тест найден.', type: Quiz })
	@ApiNotFoundResponse({ description: 'Тест не найден.' })
	async findOne(@Param('id') id: string) {
		return this.quizzesService.findOne(id);
	}

	@Patch(':id')
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiOperation({ summary: 'Обновить тест (только для админов/модераторов)' })
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiBody({ type: UpdateQuizDto })
	@ApiOkResponse({ description: 'Тест успешно обновлен.', type: Quiz })
	@ApiNotFoundResponse({ description: 'Тест не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
		return this.quizzesService.update(id, updateQuizDto);
	}

	@Delete(':id')
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiOperation({ summary: 'Удалить тест (только для админов/модераторов)' })
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiOkResponse({ description: 'Тест успешно удален.' })
	@ApiNotFoundResponse({ description: 'Тест не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	remove(@Param('id') id: string) {
		return this.quizzesService.remove(id);
	}

	@Post(':id/submit')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Отправить ответы на тест' })
	@ApiParam({ name: 'id', description: 'ID теста', type: String })
	@ApiBody({ type: SubmitQuizDto })
	@ApiOkResponse({ description: 'Ответы успешно отправлены.' }) // Define a proper response DTO/entity later
	@ApiNotFoundResponse({ description: 'Тест не найден.' })
	submit(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() submitQuizDto: SubmitQuizDto
	) {
		return this.quizzesService.submit(userId, id, submitQuizDto);
	}
}
