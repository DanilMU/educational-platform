import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUsersApi } from '../requests/admin-wrapper';
import { User, PaginatedUsersDto, UpdateUserDto } from '../types';

interface GetAdminUsersQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminUsersQuery({ skip, take }: GetAdminUsersQueryProps) {
  return useQuery<PaginatedUsersDto>({
    queryKey: ['admin-users', skip, take],
    queryFn: async () => {
      const result = await adminUsersApi.getAll({ skip: skip?.toString(), take: take?.toString() });
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useAdminUserQuery(id: string) {
  return useQuery<User>({
    queryKey: ['admin-user', id],
    queryFn: async () => {
      const result = await adminUsersApi.getById(id);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useCreateAdminUserMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminUsersApi.create,
    onSuccess: () => {
      // Инвалидируем кэш пользователей после создания
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}

export function useUpdateAdminUserMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (variables: { id: string; userData: UpdateUserDto }) => 
      adminUsersApi.update(variables.id, variables.userData),
    onSuccess: () => {
      // Инвалидируем кэш пользователей после обновления
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-user'] });
    },
  });
}

export function useDeleteAdminUserMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminUsersApi.delete,
    onSuccess: () => {
      // Инвалидируем кэш пользователей после удаления
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}