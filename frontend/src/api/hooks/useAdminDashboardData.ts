import { useQuery } from '@tanstack/react-query';
import { getAdminDashboardData } from '../requests/admin';
import { DashboardDataDto } from '../types';

export function useAdminDashboardData() {
  return useQuery<DashboardDataDto>({
    queryKey: ['adminDashboardData'],
    queryFn: getAdminDashboardData,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
