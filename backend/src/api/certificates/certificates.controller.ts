import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	Param,
	Post,
	Res,
	UseGuards
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Response } from 'express';
import { Certificate } from 'src/api/certificates/entities/certificate.entity';
import { GetUser, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto';

@ApiTags('Certificates')
@ApiBearerAuth()
@Controller('certificates')
@UseGuards(JwtAuthGuard)
export class CertificatesController {
	constructor(private readonly certificatesService: CertificatesService) {}

	@Post()
	@Roles(Role.ADMIN, Role.MODERATOR)
	@UseGuards(RolesGuard)
	@ApiOperation({ summary: 'Создать новый сертификат' })
	@ApiBody({ type: CreateCertificateDto })
	@ApiCreatedResponse({
		description: 'Сертификат успешно создан.',
		type: Certificate
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	create(@Body() dto: CreateCertificateDto) {
		return this.certificatesService.create(dto);
	}

	@Get()
	@Roles(Role.ADMIN)
	@UseGuards(RolesGuard)
	@ApiOperation({ summary: 'Получить все сертификаты (только для админов)' })
	@ApiOkResponse({
		description: 'Список всех сертификатов.',
		type: [Certificate]
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	findAll() {
		return this.certificatesService.findAll();
	}

	@Get('/user/:userId')
	@UseGuards(RolesGuard)
	@ApiOperation({ summary: 'Найти сертификаты по ID пользователя' })
	@ApiParam({
		name: 'userId',
		description: 'ID пользователя',
		type: String
	})
	@ApiOkResponse({
		description: 'Сертификаты пользователя найдены.',
		type: [Certificate]
	})
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	findByUser(@Param('userId') userId: string, @GetUser() user: User) {
		if (user.id !== userId && user.role !== Role.ADMIN) {
			throw new ForbiddenException(
				'У вас нет прав на просмотр этих сертификатов.'
			);
		}
		return this.certificatesService.findByUser(userId);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Найти сертификат по ID' })
	@ApiParam({ name: 'id', description: 'ID сертификата', type: String })
	@ApiOkResponse({ description: 'Сертификат найден.', type: Certificate })
	@ApiNotFoundResponse({ description: 'Сертификат не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	findOne(@Param('id') id: string, @GetUser() user: User) {
		return this.certificatesService.findOne(id, user);
	}

	@Get(':id/download')
	@ApiOperation({ summary: 'Скачать сертификат в формате PDF' })
	@ApiParam({ name: 'id', description: 'ID сертификата', type: String })
	@ApiOkResponse({
		description: 'PDF файл сертификата.',
		content: {
			'application/pdf': { schema: { type: 'string', format: 'binary' } }
		}
	})
	@ApiNotFoundResponse({ description: 'Сертификат не найден.' })
	@ApiForbiddenResponse({ description: 'Отказано в доступе' })
	async download(
		@Param('id') id: string,
		@GetUser() user: User,
		@Res() res: Response
	) {
		const pdfBuffer = await this.certificatesService.generatePdf(id, user);

		res.set({
			'Content-Type': 'application/pdf',
			'Content-Length': pdfBuffer.length,
			'Content-Disposition': `attachment; filename="certificate-${id}.pdf"`
		});

		res.send(pdfBuffer);
	}
}
