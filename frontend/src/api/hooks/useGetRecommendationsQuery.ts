import { useQuery } from '@tanstack/react-query';
import { recommendationsControllerGetRecommendationsForCurrentUser } from '../generated-client';
import { RecommendationsDto } from '../types';

export function useGetRecommendationsQuery() {
  return useQuery<RecommendationsDto>({
    queryKey: ['recommendations', 'current-user'],
    queryFn: async () => {
      const response = await recommendationsControllerGetRecommendationsForCurrentUser();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
