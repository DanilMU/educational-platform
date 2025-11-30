import { instance } from '../instance'
import { DashboardDataDto } from '../types'

export const getAdminDashboardData = async () => {
	return await instance.get<DashboardDataDto>('/admin/dashboard').then(res => res.data)
}
