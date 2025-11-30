import { ApiProperty } from '@nestjs/swagger';

class PopularCourseDto {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	title!: string;

	@ApiProperty()
	enrollments!: number;

	@ApiProperty()
	completions!: number;
}

class RecentActivityDto {
	@ApiProperty()
	userId!: string;

	@ApiProperty()
	action!: string;

	@ApiProperty()
	timestamp!: Date;
}

export class DashboardDataDto {
	@ApiProperty()
	totalUsers!: number;

	@ApiProperty()
	activeUsers!: number;

	@ApiProperty()
	totalCourses!: number;

	@ApiProperty()
	totalLessons!: number;

	@ApiProperty()
	completionRate!: number;

	@ApiProperty()
	averageTimeSpent!: number;

	@ApiProperty({ type: [PopularCourseDto] })
	popularCourses!: PopularCourseDto[];

	@ApiProperty({ type: [RecentActivityDto] })
	recentActivity!: RecentActivityDto[];
}
