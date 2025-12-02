import { useQuery } from '@tanstack/react-query';
import { lessonsControllerFindAll } from '../generated-client';
import { PaginatedLessonsDto } from '../types';

interface GetLessonsQueryProps {
  skip: number;
  take: number;
}

export function useGetLessonsQuery({ skip, take }: GetLessonsQueryProps) {
  return useQuery<PaginatedLessonsDto>({
    queryKey: ['lessons', skip, take],
    queryFn: async () => {
      const response = await lessonsControllerFindAll({ skip: String(skip), take: String(take) });
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
