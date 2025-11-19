import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getProfile } from '../requests/user'
import type { User } from '../types/user'

export function useGetProfileQuery(
	options?: Omit<UseQueryOptions<User, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get profile'],
		queryFn: getProfile,
		...options
	})
}
