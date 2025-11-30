import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getEnrolledSubjects } from '../requests/subject'
import type { EnrolledSubject } from '../types/enrolled-subject'
import { LearningPathDto } from '../types';

export function useGetEnrolledSubjectsQuery(
    userId: string,
    options?: UseQueryOptions<LearningPathDto, Error, LearningPathDto, ['get enrolled subjects', string]>
) {
 return useQuery({
           queryKey: ['get enrolled subjects', userId],
           queryFn: async () => {
             const data = await getEnrolledSubjects(userId);
             return data;
           },
           ...options
  })
}
