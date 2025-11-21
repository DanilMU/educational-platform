import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getSubjectById } from '../requests/subject'
import type { Subject } from '../types/subject'

export function useGetSubjectByIdQuery(
	id: string,
	options?: Omit<UseQueryOptions<Subject, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get subject by id', id],
		queryFn: () => getSubjectById(id),
		...options
	})
}
