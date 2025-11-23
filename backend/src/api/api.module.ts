import { Module } from '@nestjs/common';

import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { CertificatesModule } from './certificates/certificates.module';
import { FilesModule } from './files/files.module';
import { LearningPathModule } from './learning-path/learning-path.module';
import { LessonsModule } from './lessons/lessons.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProgressModule } from './progress/progress.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		SubjectsModule,
		TopicsModule,
		LessonsModule,
		QuizzesModule,
		ProgressModule,
		CertificatesModule,
		FilesModule,
		RecommendationsModule,
		AnalyticsModule,
		NotificationsModule,
		LearningPathModule
	]
})
export class ApiModule {}
