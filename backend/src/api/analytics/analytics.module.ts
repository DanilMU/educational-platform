import { Module } from '@nestjs/common';

import { AnalyticsModule } from '../admin/analytics/analytics.module';

import { UserAnalyticsController } from './analytics.controller';

@Module({
	imports: [AnalyticsModule],
	controllers: [UserAnalyticsController],
	providers: []
})
export class UserAnalyticsModule {}
