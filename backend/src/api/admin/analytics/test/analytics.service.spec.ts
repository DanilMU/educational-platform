import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { AnalyticsService } from '../analytics.service';

describe('AnalyticsService', () => {
	let service: AnalyticsService;

	const mockPrismaService = {
		userProgress: {
			count: jest.fn()
		},
		lesson: {
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

	describe('getUserProgressOverTime', () => {
		beforeEach(() => {
			// Reset mocks before each test in this block
			mockPrismaService.userProgress.count.mockReset();
			mockPrismaService.lesson.count.mockReset();
		});

		it('should return progress for the last 6 months', async () => {
			mockPrismaService.lesson.count.mockResolvedValue(100);
			// Mock completed lessons for each of the last 6 months
			mockPrismaService.userProgress.count
				.mockResolvedValueOnce(10) // 5 months ago
				.mockResolvedValueOnce(15) // 4 months ago
				.mockResolvedValueOnce(20) // 3 months ago
				.mockResolvedValueOnce(25) // 2 months ago
				.mockResolvedValueOnce(30) // 1 month ago
				.mockResolvedValueOnce(35); // current month

			const result =
				await service.getUserProgressOverTime('some-user-id');

			expect(result.monthlyProgress).toHaveLength(6);
			expect(mockPrismaService.userProgress.count).toHaveBeenCalledTimes(
				6
			);
			expect(mockPrismaService.lesson.count).toHaveBeenCalledTimes(6);
		});

		it('should return correct progress percentages', async () => {
			mockPrismaService.lesson.count.mockResolvedValue(50);
			mockPrismaService.userProgress.count
				.mockResolvedValueOnce(5) // 10%
				.mockResolvedValueOnce(10) // 20%
				.mockResolvedValueOnce(15) // 30%
				.mockResolvedValueOnce(20) // 40%
				.mockResolvedValueOnce(25) // 50%
				.mockResolvedValueOnce(30); // 60%

			const result =
				await service.getUserProgressOverTime('some-user-id');

			expect(result.monthlyProgress.map(p => p.progress)).toEqual([
				10, 20, 30, 40, 50, 60
			]);
		});

		it('should return 0 progress if there are no completed lessons', async () => {
			mockPrismaService.lesson.count.mockResolvedValue(100);
			mockPrismaService.userProgress.count.mockResolvedValue(0);

			const result =
				await service.getUserProgressOverTime('some-user-id');

			expect(result.monthlyProgress.every(p => p.progress === 0)).toBe(
				true
			);
		});

		it('should return 0 progress if there are no lessons in the system', async () => {
			mockPrismaService.lesson.count.mockResolvedValue(0);
			mockPrismaService.userProgress.count.mockResolvedValue(10); // This shouldn't happen in practice

			const result =
				await service.getUserProgressOverTime('some-user-id');

			expect(result.monthlyProgress.every(p => p.progress === 0)).toBe(
				true
			);
		});
	});
});
