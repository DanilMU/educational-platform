import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getProgress } from '../requests/progress'
import type { UserProgress } from '../types/progress'

export function useGetUserProgressQuery(
	options?: Omit<UseQueryOptions<UserProgress, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get user progress'],
		queryFn: getProgress,
		...options
	})
}
