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
import { Lesson as LessonModel, Role } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateLessonDto, UpdateLessonDto } from './dto';
import { LessonDescriptionDto } from './dto/lesson-description.dto';
import { PaginatedLessonsDto } from './dto/paginated-lessons.dto';
import { PrerequisitesDto } from './dto/prerequisites.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
	constructor(private readonly lessonsService: LessonsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Создать новый урок' })
	@ApiBody({ type: CreateLessonDto })
	@ApiCreatedResponse({ description: 'Урок успешно создан.', type: Lesson })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(@Body() createLessonDto: CreateLessonDto) {
		return this.lessonsService.create(createLessonDto);
	}

	@Get()
	@ApiOperation({ summary: 'Получить все уроки' })
	@ApiOkResponse({
		description: 'Список всех уроков.',
		type: PaginatedLessonsDto
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
		@Query('skip') skip: string,
		@Query('take') take: string
	): Promise<{ lessons: LessonModel[]; total: number }> {
		return this.lessonsService.findAll(+skip, +take);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Найти урок по ID' })
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({ description: 'Урок найден.', type: Lesson })
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	findOne(@Param('id') id: string) {
		return this.lessonsService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Обновить урок' })
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiBody({ type: UpdateLessonDto })
	@ApiOkResponse({ description: 'Урок успешно обновлен.', type: Lesson })
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
		return this.lessonsService.update(id, updateLessonDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Удалить урок' })
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({ description: 'Урок успешно удален.' })
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	remove(@Param('id') id: string) {
		return this.lessonsService.remove(id);
	}

	@Get(':id/description')
	@ApiOperation({
		summary:
			'Получить детальное описание урока с целями обучения и требованиями'
	})
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({
		description: 'Детальное описание урока.',
		type: LessonDescriptionDto
	})
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	getLessonDescription(@Param('id') id: string) {
		return this.lessonsService.getLessonDescription(id);
	}

	@Get(':id/prerequisites')
	@ApiOperation({
		summary: 'Получить список уроков, которые нужно пройти перед текущим'
	})
	@ApiParam({ name: 'id', description: 'ID урока', type: String })
	@ApiOkResponse({
		description: 'Список уроков, которые нужно пройти перед текущим.',
		type: PrerequisitesDto
	})
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	getLessonPrerequisites(@Param('id') id: string) {
		return this.lessonsService.getLessonPrerequisites(id);
	}
}
