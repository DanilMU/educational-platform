import { Module } from '@nestjs/common';

import { TopicsModule } from '../topics/topics.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { DashboardController } from './dashboard.controller';

@Module({
	imports: [AnalyticsModule, TopicsModule],
	controllers: [DashboardController, AdminController],
	providers: [AdminService]
})
export class AdminModule {}
