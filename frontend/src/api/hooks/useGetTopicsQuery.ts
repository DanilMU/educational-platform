import { useQuery } from '@tanstack/react-query';
import { getAllTopicsPaginated } from '../requests/topic';
import { PaginatedTopicsDto } from '../types';

interface GetTopicsQueryProps {
  skip: number;
  take: number;
}

export function useGetTopicsQuery({ skip, take }: GetTopicsQueryProps) {
  return useQuery<PaginatedTopicsDto>({
    queryKey: ['topics', skip, take],
    queryFn: async () => {
      const result = await getAllTopicsPaginated(String(skip), String(take));
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
