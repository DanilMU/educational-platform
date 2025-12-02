import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/api/auth/interfaces';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					let token: string | null = null;
					if (request && request.cookies) {
						token = request.cookies['accessToken'] as string;
					}
					if (
						!token &&
						request &&
						request.headers &&
						request.headers.authorization
					) {
						const parts = request.headers.authorization.split(' ');
						if (parts.length === 2 && parts[0] === 'Bearer') {
							token = parts[1];
						}
					}
					return token;
				}
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
			algorithms: ['HS256']
		});
	}

	public async validate(payload: JwtPayload) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: payload.id
			}
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}
}
