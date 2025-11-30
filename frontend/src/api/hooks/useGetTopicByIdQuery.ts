import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getTopicById } from '../requests/topic';
import type { Topic } from '../types';

export function useGetTopicByIdQuery(
	id: string,
	options?: Omit<UseQueryOptions<Topic, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get topic by id', id],
		queryFn: () => getTopicById(id),
		...options
	})
}
