import { ApiProperty } from '@nestjs/swagger';

export class CourseAnalyticsDto {
	@ApiProperty({
		description: 'ID курса',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	courseId!: string;

	@ApiProperty({
		description: 'Количество студентов на курсе',
		example: 150
	})
	numberOfStudents!: number;

	@ApiProperty({
		description: 'Средний процент завершения курса',
		example: 75
	})
	averageCompletionRate!: number;

	@ApiProperty({
		description: 'Средний балл по тестам в курсе',
		example: 85
	})
	averageScore!: number;
}
