import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
	ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

import { AppModule } from './app.module';
import { getCorsConfig, getSwaggerConfig } from './config';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		console.error('Глобальная ошибка:', exception);

		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const message = exception.message;
			const responseObj = exception.getResponse() as
				| string
				| { error: string };

			console.log('Ошибка HttpException:', {
				status,
				message,
				responseObj,
				path: request.url,
				method: request.method,
				timestamp: new Date().toISOString()
			});

			response.status(status).json({
				statusCode: status,
				message: message,
				error:
					typeof responseObj === 'string'
						? responseObj
						: responseObj.error || 'Bad Request',
				path: request.url,
				method: request.method,
				timestamp: new Date().toISOString()
			});
		} else {
			console.log('Неизвестная ошибка:', {
				error: exception,
				path: request.url,
				method: request.method,
				timestamp: new Date().toISOString()
			});

			response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Internal server error',
				error: 'Internal Server Error',
				path: request.url,
				method: request.method,
				timestamp: new Date().toISOString()
			});
		}
	}
}

/**
 * Точка входа в приложение.
 * Эта функция инициализирует и запускает NestJS приложение.
 */
async function bootstrap() {
	// Создаем экземпляр приложения NestJS, используя корневой модуль AppModule.
	const app = await NestFactory.create(AppModule);

	// Получаем доступ к сервису конфигурации.
	const config = app.get(ConfigService);
	// Создаем логгер для вывода сообщений.
	const logger = new Logger(AppModule.name);

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Удаляет свойства, не указанные в DTO
			forbidNonWhitelisted: false, // Не запрещает не указанные свойства, а просто удаляет их
			transform: true, // Преобразует строки в нужные типы данных
			validateCustomDecorators: true, // Валидирует кастомные декораторы
			skipMissingProperties: false // Не пропускает пропущенные свойства
		})
	);
	app.useGlobalFilters(new GlobalExceptionFilter());

	// Включаем CORS с настройками из конфигурационного файла.
	app.enableCors(getCorsConfig(config));

	const swaggerConfig = getSwaggerConfig();
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		jsonDocumentUrl: 'openapi.json'
	});

	// Получаем порт и хост из конфигурации.
	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	try {
		// Запускаем приложение на указанном порту.
		await app.listen(port);

		// Логируем сообщение об успешном запуске.
		logger.log(`Server is running at: ${host}`);
	} catch (error: unknown) {
		if (error instanceof Error) {
			logger.error(`Failed to start server: ${error.message}`, error);
		} else {
			logger.error('Failed to start server: Unknown error', error);
		}
		process.exit(1);
	}
}

// Запускаем асинхронную функцию bootstrap.
void bootstrap();
