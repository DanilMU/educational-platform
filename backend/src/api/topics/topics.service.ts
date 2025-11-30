import { Injectable } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { CreateTopicDto, UpdateTopicDto } from './dto';

@Injectable()
export class TopicsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createTopicDto: CreateTopicDto) {
		return this.prisma.topic.create({ data: createTopicDto });
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
		return this.prisma.topic.findUnique({ where: { id } });
	}

	update(id: string, updateTopicDto: UpdateTopicDto) {
		return this.prisma.topic.update({
			where: { id },
			data: updateTopicDto
		});
	}

	remove(id: string) {
		return this.prisma.topic.delete({ where: { id } });
	}
}
