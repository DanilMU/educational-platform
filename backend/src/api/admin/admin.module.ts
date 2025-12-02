import { Module } from '@nestjs/common';

import { QuizzesModule } from '../quizzes/quizzes.module';
import { TopicsModule } from '../topics/topics.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { DashboardController } from './dashboard.controller';

@Module({
	imports: [AnalyticsModule, TopicsModule, QuizzesModule],
	controllers: [DashboardController, AdminController],
	providers: [AdminService]
})
export class AdminModule {}
