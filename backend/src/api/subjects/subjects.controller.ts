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
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateSubjectDto, UpdateSubjectDto } from './dto';
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
		type: [Subject]
	})
	findAll() {
		return this.subjectsService.findAll();
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
}
