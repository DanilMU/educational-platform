import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsDto {
	@ApiProperty({
		description: 'ID пользователя, для которого предоставляется аналитика',
		example: 'clx1z2y3y000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'Общий прогресс пользователя в процентах',
		example: 75
	})
	totalProgress!: number;

	@ApiProperty({
		description: 'Общее время, потраченное на обучение в минутах',
		example: 1250
	})
	totalTimeSpent!: number;

	@ApiProperty({
		description: 'Среднее время на урок в минутах',
		example: 25
	})
	averageTimePerLesson!: number;

	@ApiProperty({
		description: 'Общее количество пройденных уроков',
		example: 15
	})
	lessonsCompleted!: number;

	@ApiProperty({
		description: 'Общее количество уроков',
		example: 20
	})
	totalLessons!: number;

	@ApiProperty({
		description: 'Процент успешных прохождений тестов',
		example: 85
	})
	quizSuccessRate!: number;

	@ApiProperty({
		description: 'Средний балл за тесты',
		example: 78
	})
	averageQuizScore!: number;

	@ApiProperty({
		description: 'Сильные стороны пользователя (лучшие темы)',
		type: 'array',
		items: {
			type: 'string'
		},
		example: ['Основы JavaScript', 'Функции']
	})
	strongAreas!: string[];

	@ApiProperty({
		description: 'Слабые стороны пользователя (темы, требующие улучшения)',
		type: 'array',
		items: {
			type: 'string'
		},
		example: ['Объекты', 'Прототипы']
	})
	weakAreas!: string[];

	@ApiProperty({
		description: 'Дата генерации аналитики',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	generatedAt!: Date;
}
