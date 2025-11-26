import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getProgress } from '../requests/progress'
import type { Progress } from '../types'

export function useGetUserProgressQuery(
	options?: Omit<UseQueryOptions<Progress[], unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get user progress'],
		queryFn: getProgress,
		...options
	})
}
