import { useQuery } from '@tanstack/react-query';
import { analyticsControllerGetUserAnalytics, analyticsControllerGetCourseAnalytics } from '../generated-client';

export function useAdminUserAnalytics(userId: string) {
  return useQuery({
    queryKey: ['adminUserAnalytics', userId],
    queryFn: async () => {
      const response = await analyticsControllerGetUserAnalytics(userId);
      return response;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useAdminCourseAnalytics(courseId: string) {
    return useQuery({
      queryKey: ['adminCourseAnalytics', courseId],
      queryFn: async () => {
        const response = await analyticsControllerGetCourseAnalytics(courseId);
        return response;
      },
      enabled: !!courseId,
      staleTime: 5 * 60 * 1000, // 5 минут
    });
  }
