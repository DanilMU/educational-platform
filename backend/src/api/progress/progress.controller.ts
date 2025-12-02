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

import {
	CompleteSubjectDto,
	CreateProgressDto,
	ProgressDto,
	UpdateProgressDto
} from './dto';
import { Progress } from './entities/progress.entity';
import { ProgressService } from './progress.service';

@ApiTags('Progress')
@ApiBearerAuth()
@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Post()
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(RolesGuard)
	@ApiOperation({
		summary: 'Создать запись о прогрессе (только для админов/модераторов)'
	})
	@ApiBody({ type: CreateProgressDto })
	@ApiCreatedResponse({
		description: 'Запись о прогрессе успешно создана.',
		type: Progress
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(
		@Authorized('id') userId: string,
		@Body() createProgressDto: CreateProgressDto
	): Promise<ProgressDto> {
		return this.progressService.create(userId, createProgressDto);
	}

	@Get()
	@ApiOperation({
		summary: 'Получить весь прогресс для текущего пользователя'
	})
	@ApiOkResponse({
		description: 'Список прогресса пользователя.',
		type: [Progress]
	})
	findAll(@Authorized('id') userId: string): Promise<ProgressDto[]> {
		return this.progressService.findAll(userId);
	}

	@Get(':lessonId')
	@ApiOperation({
		summary:
			'Получить прогресс по конкретному уроку для текущего пользователя'
	})
	@ApiParam({ name: 'lessonId', description: 'ID урока', type: String })
	@ApiOkResponse({
		description: 'Запись о прогрессе найдена.',
		type: Progress
	})
	@ApiNotFoundResponse({ description: 'Запись о прогрессе не найдена.' })
	findOne(
		@Authorized('id') userId: string,
		@Param('lessonId') lessonId: string
	): Promise<ProgressDto | null> {
		return this.progressService.findOne(userId, lessonId);
	}

	@Patch(':lessonId')
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(RolesGuard)
	@ApiOperation({
		summary: 'Обновить прогресс по уроку (только для админов/модераторов)'
	})
	@ApiParam({ name: 'lessonId', description: 'ID урока', type: String })
	@ApiBody({ type: UpdateProgressDto })
	@ApiOkResponse({
		description: 'Запись о прогрессе успешно обновлена.',
		type: Progress
	})
	@ApiNotFoundResponse({ description: 'Запись о прогрессе не найдена.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	update(
		@Authorized('id') userId: string,
		@Param('lessonId') lessonId: string,
		@Body() updateProgressDto: UpdateProgressDto
	): Promise<ProgressDto> {
		return this.progressService.update(userId, lessonId, updateProgressDto);
	}

	@Delete(':lessonId')
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(RolesGuard)
	@ApiOperation({
		summary: 'Удалить прогресс по уроку (только для админов/модераторов)'
	})
	@ApiParam({ name: 'lessonId', description: 'ID урока', type: String })
	@ApiOkResponse({ description: 'Запись о прогрессе успешно удалена.' })
	@ApiNotFoundResponse({ description: 'Запись о прогрессе не найдена.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	remove(
		@Authorized('id') userId: string,
		@Param('lessonId') lessonId: string
	): Promise<ProgressDto> {
		return this.progressService.remove(userId, lessonId);
	}

	@Post('complete-subject')
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(RolesGuard)
	@ApiOperation({
		summary:
			'Завершить все уроки по предмету (только для админов/модераторов)'
	})
	@ApiBody({ type: CompleteSubjectDto })
	@ApiOkResponse({ description: 'Все уроки по предмету успешно завершены.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	completeSubject(@Body() dto: CompleteSubjectDto) {
		return this.progressService.completeAllLessonsInSubject(dto);
	}

	@Post(':lessonId/mark-completed')
	@ApiOperation({
		summary: 'Отметить урок как завершенный'
	})
	@ApiParam({ name: 'lessonId', description: 'ID урока', type: String })
	@ApiOkResponse({
		description: 'Урок успешно отмечен как завершенный.',
		type: Progress
	})
	@ApiNotFoundResponse({ description: 'Урок не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	markLessonAsCompleted(
		@Authorized('id') userId: string,
		@Param('lessonId') lessonId: string
	) {
		return this.progressService.markLessonAsCompleted(userId, lessonId);
	}
}
