import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getLessonById } from '../requests/lesson'
import type { Lesson } from '../types/lesson'

export function useGetLessonByIdQuery(
	id: string,
	options?: Omit<UseQueryOptions<Lesson, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get lesson by id', id],
		queryFn: () => getLessonById(id),
		...options
	})
}
