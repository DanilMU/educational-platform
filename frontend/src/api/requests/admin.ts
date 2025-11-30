import { instance } from '../instance'
import { DashboardDataDto } from '../types';

export const getAdminDashboardData = async (): Promise<DashboardDataDto> => {
  return await instance.get('/admin/dashboard').then(res => res.data);
};
