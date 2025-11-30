import { useQuery } from '@tanstack/react-query';
import { analyticsControllerGetUserProgressOverTime } from '../generated-client';
import { UserProgressOverTimeDto } from '../types';
import { useAuth } from '@/src/hooks/useAuth';

export function useGetUserProgressOverTimeQuery() {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<UserProgressOverTimeDto>({
    queryKey: ['userProgressOverTime', userId],
    queryFn: async () => {
        if (!userId) {
            throw new Error('User ID is not available');
        }
      const response = await analyticsControllerGetUserProgressOverTime(userId);
      return response;
    },
    enabled: !!userId, // Only run the query if userId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
