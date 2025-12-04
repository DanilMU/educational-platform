import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAllSubjects } from '../requests/subject'
import type { PaginatedSubjectsDto } from '../types/paginatedSubjectsDto'

export function useGetSubjectsQuery(
	options?: Omit<UseQueryOptions<PaginatedSubjectsDto, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get all subjects'],
		queryFn: async () => {
			const response = await getAllSubjects('0', '1000'); // Увеличиваем лимит, чтобы получить все курсы
			// Преобразуем ответ к формату PaginatedSubjectsDto
			return {
				data: response.data,
				total: response.total
			};
		},
		...options
	})
}
