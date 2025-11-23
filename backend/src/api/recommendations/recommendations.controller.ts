import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Authorized } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards';

import { RecommendationsDto } from './dto/recommendations.dto';
import { RecommendationsService } from './recommendations.service';

@ApiTags('Recommendations')
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
export class RecommendationsController {
	constructor(
		private readonly recommendationsService: RecommendationsService
	) {}

	@Get('users/:id')
	@ApiOperation({
		summary:
			'Получить рекомендации следующих уроков на основе прогресса пользователя'
	})
	@ApiParam({ name: 'id', description: 'ID пользователя', type: String })
	@ApiOkResponse({
		description: 'Рекомендации для пользователя.',
		type: RecommendationsDto
	})
	@ApiNotFoundResponse({ description: 'Пользователь не найден.' })
	getRecommendationsForUser(@Param('id') id: string) {
		return this.recommendationsService.getRecommendationsForUser(id);
	}

	@Get('current-user')
	@ApiOperation({
		summary:
			'Получить рекомендации для текущего авторизованного пользователя'
	})
	@ApiOkResponse({
		description: 'Рекомендации для текущего пользователя.',
		type: RecommendationsDto
	})
	getRecommendationsForCurrentUser(@Authorized('id') userId: string) {
		return this.recommendationsService.getRecommendationsForUser(userId);
	}
}
