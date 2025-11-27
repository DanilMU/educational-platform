import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getProfile } from '../requests/user'
import type { GetMeDto } from '../types'

export function useGetProfileQuery(
	options?: Omit<UseQueryOptions<GetMeDto, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get profile'],
		queryFn: getProfile,
		...options
	})
}
