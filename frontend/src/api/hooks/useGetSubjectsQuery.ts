import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAllSubjects } from '../requests/subjects'
import type { Subject } from '../types/subject'

export function useGetSubjectsQuery(
	options?: Omit<UseQueryOptions<Subject[], unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get all subjects'],
		queryFn: getAllSubjects,
		...options
	})
}
