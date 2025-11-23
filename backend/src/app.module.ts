import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from 'nestjs-throttler';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { InfraModule } from './infra/infra.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		CacheModule.register({
			isGlobal: true,
			ttl: 300 // 5 minutes
		}),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 20
		}),
		ApiModule,
		InfraModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
