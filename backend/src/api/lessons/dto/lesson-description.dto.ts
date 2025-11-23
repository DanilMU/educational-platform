import { ApiProperty } from '@nestjs/swagger';

import { Lesson } from '../entities/lesson.entity';

export class LessonDescriptionDto {
	@ApiProperty({
		description: 'Основная информация об уроке',
		type: Lesson
	})
	lesson!: Lesson;

	@ApiProperty({
		description: 'Цели обучения для урока',
		example:
			'Изучить основы TypeScript и понять, как использовать типизацию',
		required: false
	})
	learningObjectives?: string;

	@ApiProperty({
		description: 'Требования для прохождения урока',
		example: 'Базовые знания JavaScript',
		required: false
	})
	prerequisites?: string;

	@ApiProperty({
		description: 'Рекомендуемое время прохождения урока в минутах',
		example: 45,
		required: false
	})
	estimatedTime?: number;

	@ApiProperty({
		description: 'Сложность урока от 1 до 5',
		example: 3,
		required: false
	})
	difficulty?: number;

	@ApiProperty({
		description: 'Список вложений (PDF, документы и т.д.)',
		example: ['/uploads/file1.pdf', '/uploads/file2.zip'],
		required: false
	})
	attachments?: string[];
}
