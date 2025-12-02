import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class PaginatedResponseDto<T> {
	constructor(data: T[], total: number) {
		this.data = data;
		this.total = total;
	}

	@ApiProperty({ isArray: true, description: 'Массив элементов' })
	@IsArray()
	@Type(() => Object) // This will be overridden in specific DTOs
	data: T[];

	@ApiProperty({
		example: 100,
		description: 'Общее количество элементов'
	})
	@IsNumber()
	total: number;
}
