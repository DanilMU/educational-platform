import { useQuery } from '@tanstack/react-query';
import { getAllUsersPaginated } from '../requests/user';
import { User, PaginatedUsersDto } from '../types';

interface GetUsersQueryProps {
  skip: number;
  take: number;
}

export function useGetUsersQuery({ skip, take }: GetUsersQueryProps) {
  return useQuery<PaginatedUsersDto>({
    queryKey: ['users', skip, take],
    queryFn: async () => {
      const result = await getAllUsersPaginated(String(skip), String(take));
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
