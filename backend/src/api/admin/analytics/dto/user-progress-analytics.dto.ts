import { ApiProperty } from '@nestjs/swagger';

export class UserProgressAnalyticsDto {
	@ApiProperty({
		description: 'ID пользователя',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'Количество пройденных уроков',
		example: 10
	})
	completedLessons!: number;

	@ApiProperty({
		description: 'Общее количество уроков в курсе',
		example: 20
	})
	totalLessons!: number;

	@ApiProperty({
		description: 'Прогресс в процентах',
		example: 50
	})
	progressPercentage!: number;
}
