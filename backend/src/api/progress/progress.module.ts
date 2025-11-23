import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

import { NotificationsModule } from '../notifications/notifications.module';

import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
	imports: [PrismaModule, NotificationsModule],
	controllers: [ProgressController],
	providers: [ProgressService],
	exports: [ProgressService]
})
export class ProgressModule {}
