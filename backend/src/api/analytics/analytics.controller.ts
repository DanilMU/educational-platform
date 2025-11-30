import { Controller, Get, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { Authorized } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards';

import { AnalyticsService } from '../admin/analytics/analytics.service';
import { AnalyticsDto } from '../admin/analytics/dto';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserAnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Get('current-user')
	@ApiOperation({
		summary: 'Получить аналитику для текущего авторизованного пользователя'
	})
	@ApiOkResponse({
		description: 'Аналитика для текущего пользователя.',
		type: AnalyticsDto
	})
	getCurrentUserAnalytics(@Authorized('id') userId: string) {
		return this.analyticsService.getUserAnalytics(userId);
	}
}
