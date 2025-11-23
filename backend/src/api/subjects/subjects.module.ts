import { Module } from '@nestjs/common';
import { LearningPathModule } from '../learning-path/learning-path.module';

import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
	imports: [LearningPathModule],
	controllers: [SubjectsController],
	providers: [SubjectsService]
})
export class SubjectsModule {}
