import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getEnrolledSubjects } from '../requests/subject'
import type { Subject } from '../types';

export function useGetEnrolledSubjectsQuery(
    userId: string,
    options?: UseQueryOptions<Subject[], Error, Subject[], ['get enrolled subjects', string]>
) {
 return useQuery({
           queryKey: ['get enrolled subjects', userId],
           queryFn: async () => {
             const data = await getEnrolledSubjects(userId);
             return data; // данные уже извлечены в функции запроса
           },
           ...options
  })
}
