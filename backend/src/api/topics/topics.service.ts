import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateTopicDto, UpdateTopicDto } from './dto';

@Injectable()
export class TopicsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createTopicDto: CreateTopicDto) {
		try {
			return this.prisma.topic.create({ data: createTopicDto });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					// Foreign key constraint error
					throw new ConflictException('Invalid subject ID provided');
				}
			}
			throw error;
		}
	}

	findAll(
		skip: number,
		take: number
	): Promise<{ topics: Topic[]; total: number }> {
		return this.prisma
			.$transaction([
				this.prisma.topic.findMany({
					skip: isNaN(skip) ? undefined : skip,
					take: isNaN(take) ? undefined : take
				}),
				this.prisma.topic.count()
			])
			.then(([topics, total]) => ({ topics, total }));
	}

	findOne(id: string) {
		try {
			return this.prisma.topic.findUnique({ where: { id } });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Topic not found');
				}
			}
			throw error;
		}
	}

	update(id: string, updateTopicDto: UpdateTopicDto) {
		try {
			return this.prisma.topic.update({
				where: { id },
				data: updateTopicDto
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					// Foreign key constraint error
					throw new ConflictException('Invalid subject ID provided');
				}
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Topic not found');
				}
			}
			throw error;
		}
	}

	remove(id: string) {
		try {
			return this.prisma.topic.delete({ where: { id } });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Record not found
					throw new ConflictException('Topic not found');
				}
			}
			throw error;
		}
	}
}
