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
	// Add this import
	ApiTags
} from '@nestjs/swagger';
import { Role, Subject as SubjectModel } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { LearningPathDto } from '../lessons/dto/learning-path.dto';

import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { PaginatedSubjectsDto } from './dto/paginated-subjects.dto';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
	constructor(private readonly subjectsService: SubjectsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Создать новый предмет (курс) (только для админов/модераторов)'
	})
	@ApiBody({ type: CreateSubjectDto })
	@ApiCreatedResponse({
		description: 'Предмет успешно создан.',
		type: Subject
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(@Body() createSubjectDto: CreateSubjectDto) {
		return this.subjectsService.create(createSubjectDto);
	}

	@Get()
	@ApiOperation({ summary: 'Получить все предметы (курсы)' })
	@ApiOkResponse({
		description: 'Список всех предметов.',
		type: PaginatedSubjectsDto
	})
	@ApiQuery({
		name: 'skip',
		required: false,
		type: String,
		description: 'Количество пропускаемых элементов'
	}) // Add this
	@ApiQuery({
		name: 'take',
		required: false,
		type: String,
		description: 'Количество возвращаемых элементов'
	}) // Add this
	findAll(
		@Query('skip') skip?: string,
		@Query('take') take?: string
	): Promise<{ subjects: SubjectModel[]; total: number }> {
		const skipNum = skip ? parseInt(skip, 10) : 0;
		const takeNum = take ? parseInt(take, 10) : 10; // default to 10 items
		return this.subjectsService.findAll(skipNum, takeNum);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Найти предмет (курс) по ID' })
	@ApiParam({ name: 'id', description: 'ID предмета', type: String })
	@ApiOkResponse({ description: 'Предмет найден.', type: Subject })
	@ApiNotFoundResponse({ description: 'Предмет не найден.' })
	findOne(@Param('id') id: string) {
		return this.subjectsService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Обновить предмет (курс) (только для админов/модераторов)'
	})
	@ApiParam({ name: 'id', description: 'ID предмета', type: String })
	@ApiBody({ type: UpdateSubjectDto })
	@ApiOkResponse({
		description: 'Предмет успешно обновлен.',
		type: Subject
	})
	@ApiNotFoundResponse({ description: 'Предмет не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	update(
		@Param('id') id: string,
		@Body() updateSubjectDto: UpdateSubjectDto
	) {
		return this.subjectsService.update(id, updateSubjectDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Удалить предмет (курс) (только для админов/модераторов)'
	})
	@ApiParam({ name: 'id', description: 'ID предмета', type: String })
	@ApiOkResponse({ description: 'Предмет успешно удален.' })
	@ApiNotFoundResponse({ description: 'Предмет не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	remove(@Param('id') id: string) {
		return this.subjectsService.remove(id);
	}

	@Get(':id/learning-path')
	@ApiOperation({
		summary: 'Получить полный путь обучения по курсу с зависимостями'
	})
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({
		description: 'Полный путь обучения по курсу с зависимостями.',
		type: LearningPathDto
	})
	@ApiNotFoundResponse({ description: 'Курс не найден.' })
	getLearningPath(@Param('id') id: string) {
		return this.subjectsService.getLearningPath(id);
	}

	@Get('user/:userId')
	@ApiOperation({
		summary: 'Получить курсы, в которых участвует пользователь'
	})
	@ApiParam({ name: 'userId', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Список курсов пользователя.',
		type: [Subject]
	})
	findByUserId(@Param('userId') userId: string) {
		return this.subjectsService.findByUserId(userId);
	}
}
