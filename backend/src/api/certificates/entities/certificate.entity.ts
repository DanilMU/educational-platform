import { ApiProperty } from '@nestjs/swagger';

export class Certificate {
	@ApiProperty({
		description: 'Уникальный идентификатор сертификата',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	id!: string;

	@ApiProperty({
		description: 'ID пользователя, которому выдан сертификат',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	userId!: string;

	@ApiProperty({
		description: 'ID предмета, по которому выдан сертификат',
		example: 'clx1z2y3y0000v0zwabcdef'
	})
	subjectId!: string;

	@ApiProperty({
		description: 'Дата выдачи сертификата',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	issuedAt!: Date;

	@ApiProperty({
		description: 'URL для доступа к сертификату',
		example: 'https://example.com/certificates/clx1z2y3y0000v0zwabcdef.pdf'
	})
	url!: string;

	@ApiProperty({
		description: 'Дата создания записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	createdAt!: Date;

	@ApiProperty({
		description: 'Дата последнего обновления записи',
		type: Date,
		example: '2025-11-18T12:00:00.000Z'
	})
	updatedAt!: Date;
}
