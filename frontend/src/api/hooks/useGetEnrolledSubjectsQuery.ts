import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getEnrolledSubjects } from '../requests/subject'
import type { EnrolledSubject } from '../types/enrolled-subject'

export function useGetEnrolledSubjectsQuery(
	options?: Omit<UseQueryOptions<EnrolledSubject[], unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get enrolled subjects'],
		queryFn: getEnrolledSubjects,
		...options
	})
}
