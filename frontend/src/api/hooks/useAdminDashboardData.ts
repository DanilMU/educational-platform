import { useQuery } from '@tanstack/react-query';
import { adminApiAdapter } from '../requests/admin-adapter';
import { DashboardDataDto } from '../types';

export function useAdminDashboardData() {
  return useQuery<DashboardDataDto>({
    queryKey: ['adminDashboardData'],
    queryFn: adminApiAdapter.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
