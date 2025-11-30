import { ApiProperty } from '@nestjs/swagger';

class MonthlyProgress {
	@ApiProperty({ description: 'Месяц (например, "Янв", "Фев")', example: 'Янв' })
	name!: string;

	@ApiProperty({ description: 'Прогресс в процентах', example: 75 })
	progress!: number;
}

export class UserProgressOverTimeDto {
	@ApiProperty({ description: 'ID пользователя', example: 'clx1z2y3y0000v0zwabcdef' })
	userId!: string;

	@ApiProperty({ description: 'Прогресс пользователя по месяцам', type: [MonthlyProgress] })
	monthlyProgress!: MonthlyProgress[];
}
