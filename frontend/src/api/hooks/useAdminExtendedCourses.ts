import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApiAdapter } from '../requests/admin-adapter';
import { AdminPaginatedSubjectsDto } from '../types/admin-paginated-dto';

interface GetAdminCoursesQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminExtendedCoursesQuery({ skip, take }: GetAdminCoursesQueryProps) {
  return useQuery<AdminPaginatedSubjectsDto>({
    queryKey: ['admin-courses-extended', skip, take],
    queryFn: async () => {
      return await adminApiAdapter.getAllCoursesExtended({ skip: skip?.toString(), take: take?.toString() });
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}