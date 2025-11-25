import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { getQuizByLessonId } from '../requests/quiz';
import type { Quiz } from '../types/quiz';

export function useGetQuizByLessonIdQuery(
	lessonId: string,
	options?: Omit<UseQueryOptions<Quiz, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get quiz by lesson id', lessonId],
		queryFn: () => getQuizByLessonId(lessonId),
		...options
	});
}
