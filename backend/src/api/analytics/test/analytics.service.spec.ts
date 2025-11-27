import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { AnalyticsService } from '../analytics.service';

describe('AnalyticsService', () => {
	let service: AnalyticsService;

	const mockPrismaService = {
		userProgress: {
			count: jest.fn()
		}
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnalyticsService,
				{
					provide: PrismaService,
					useValue: mockPrismaService
				}
			]
		}).compile();

		service = module.get<AnalyticsService>(AnalyticsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getSuccessRate', () => {
		it('should return 0 if there are no quizzes', async () => {
			mockPrismaService.userProgress.count.mockResolvedValue(0);
			const result = await service.getSuccessRate('some-user-id');
			expect(result.successRate).toBe(0);
		});

		it('should calculate the success rate correctly', async () => {
			// Mock total quizzes count
			mockPrismaService.userProgress.count.mockResolvedValueOnce(10);
			// Mock successful quizzes count
			mockPrismaService.userProgress.count.mockResolvedValueOnce(7);

			const result = await service.getSuccessRate('some-user-id');
			expect(result.successRate).toBe(70);
		});

		it('should round the success rate correctly', async () => {
			// Mock total quizzes count
			mockPrismaService.userProgress.count.mockResolvedValueOnce(3);
			// Mock successful quizzes count
			mockPrismaService.userProgress.count.mockResolvedValueOnce(1);

			const result = await service.getSuccessRate('some-user-id');
			expect(result.successRate).toBe(33); // 1/3 = 0.333... rounded to 33
		});
	});
});
