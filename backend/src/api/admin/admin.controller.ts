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

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('dashboard')
	@ApiOperation({ summary: 'Получить данные для дашборда админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Данные дашборда' })
	async getDashboard() {
		return this.adminService.getDashboardData();
	}

	@Get('users')
	@ApiOperation({ summary: 'Получить список пользователей админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список пользователей' })
	async getUsers() {
		// Implement actual user retrieval logic using AdminService
		return { message: 'Users list (placeholder)' };
	}

	@Get('courses')
	@ApiOperation({ summary: 'Получить список курсов админки' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Список курсов' })
	async getCourses() {
		// Implement actual course retrieval logic using AdminService
		return { message: 'Courses list (placeholder)' };
	}
}
