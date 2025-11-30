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
import { Role, Topic as TopicModel } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CreateTopicDto, UpdateTopicDto } from './dto';
import { PaginatedTopicsDto } from './dto/paginated-topics.dto';
import { Topic } from './entities/topic.entity';
import { TopicsService } from './topics.service';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
	constructor(private readonly topicsService: TopicsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Создать новую тему (только для админов/модераторов)'
	})
	@ApiBody({ type: CreateTopicDto })
	@ApiCreatedResponse({ description: 'Тема успешно создана.', type: Topic })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(@Body() createTopicDto: CreateTopicDto) {
		return this.topicsService.create(createTopicDto);
	}

	@Get()
	@ApiOperation({ summary: 'Получить все темы' })
	@ApiOkResponse({
		description: 'Список всех тем.',
		type: PaginatedTopicsDto
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
	): Promise<{ topics: TopicModel[]; total: number }> {
		return this.topicsService.findAll(+skip, +take);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Найти тему по ID' })
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiOkResponse({ description: 'Тема найдена.', type: Topic })
	@ApiNotFoundResponse({ description: 'Тема не найдена.' })
	findOne(@Param('id') id: string) {
		return this.topicsService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Обновить тему (только для админов/модераторов)' })
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiBody({ type: UpdateTopicDto })
	@ApiOkResponse({ description: 'Тема успешно обновлена.', type: Topic })
	@ApiNotFoundResponse({ description: 'Тема не найдена.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
		return this.topicsService.update(id, updateTopicDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Удалить тему (только для админов/модераторов)' })
	@ApiParam({ name: 'id', description: 'ID темы', type: String })
	@ApiOkResponse({ description: 'Тема успешно удалена.' })
	@ApiNotFoundResponse({ description: 'Тема не найдена.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	remove(@Param('id') id: string) {
		return this.topicsService.remove(id);
	}
}
