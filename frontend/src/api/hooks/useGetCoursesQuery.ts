import { useQuery } from '@tanstack/react-query';
import { subjectsControllerFindAll } from '../generated-client';
import { Subject, PaginatedSubjectsDto } from '../types';

interface GetCoursesQueryProps {
  skip: number;
  take: number;
}

export function useGetCoursesQuery({ skip, take }: GetCoursesQueryProps) {
  return useQuery<PaginatedSubjectsDto>({
    queryKey: ['courses', skip, take],
    queryFn: async () => {
      const response = await subjectsControllerFindAll({ skip: String(skip), take: String(take) });
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
