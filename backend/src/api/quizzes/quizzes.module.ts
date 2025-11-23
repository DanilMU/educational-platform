import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

import { NotificationsModule } from '../notifications/notifications.module';
import { ProgressModule } from '../progress/progress.module';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
	imports: [PrismaModule, ProgressModule, NotificationsModule],
	controllers: [QuizzesController],
	providers: [QuizzesService]
})
export class QuizzesModule {}
