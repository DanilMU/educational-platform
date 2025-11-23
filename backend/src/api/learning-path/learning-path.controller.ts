import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';

import { LearningPathDto } from '../lessons/dto/learning-path.dto';

import { LearningPathService } from './learning-path.service';

@ApiTags('Learning Path')
@Controller('learning-path')
export class LearningPathController {
	constructor(private readonly learningPathService: LearningPathService) {}

	@Get('subjects/:id')
	@ApiOperation({
		summary: 'Получить полный путь обучения по курсу с зависимостями'
	})
	@ApiParam({ name: 'id', description: 'ID курса', type: String })
	@ApiOkResponse({
		description: 'Полный путь обучения по курсу с зависимостями.',
		type: LearningPathDto
	})
	getLearningPath(@Param('id') id: string) {
		return this.learningPathService.getLearningPath(id);
	}
}
