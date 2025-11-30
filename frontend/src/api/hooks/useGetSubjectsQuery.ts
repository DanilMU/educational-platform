import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAllSubjects } from '../requests/subjects'
import type { PaginatedSubjectsDto } from '../types/paginatedSubjectsDto'

export function useGetSubjectsQuery(
	options?: Omit<UseQueryOptions<PaginatedSubjectsDto, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get all subjects'],
		queryFn: async () => {
			const response = await getAllSubjects('0', '10'); // Default pagination
			// Преобразуем ответ к формату PaginatedSubjectsDto
			return {
				data: response.subjects,
				total: response.total
			};
		},
		...options
	})
}
