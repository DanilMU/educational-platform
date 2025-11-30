import { Controller, Get, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

import { AdminService } from './admin.service';
import { DashboardDataDto } from './dto/dashboard-data.dto';

@ApiTags('Admin')
@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class DashboardController {
	constructor(private readonly adminService: AdminService) {}

	@Get()
	@ApiOperation({ summary: 'Получить данные для дашборда админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Данные дашборда', type: DashboardDataDto })
	async getDashboardData(): Promise<DashboardDataDto> {
		const data = await this.adminService.getDashboardData();
		return {
			...data,
			completionRate: 0, // Placeholder
			averageTimeSpent: 0, // Placeholder
			popularCourses: [], // Placeholder
			recentActivity: [] // Placeholder
		};
	}
}
