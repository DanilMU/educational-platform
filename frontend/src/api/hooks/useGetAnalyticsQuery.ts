import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../requests/analytics';

export const useGetAnalyticsQuery = () => {
  return useQuery({
    queryKey: ['analytics', 'current-user'],
    queryFn: getAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
