import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminTopicsApi } from '../requests/admin-wrapper';
import { Topic, PaginatedTopicsDto, UpdateTopicDto } from '../types';
import { adminApiAdapter } from '../requests/admin-adapter';

interface GetAdminTopicsQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminTopicsQuery({ skip, take }: GetAdminTopicsQueryProps) {
  return useQuery<PaginatedTopicsDto>({
    queryKey: ['admin-topics', skip, take],
    queryFn: async () => {
      return await adminApiAdapter.getAllTopics({ skip: skip?.toString(), take: take?.toString() });
    },
    staleTime: 5 * 60 * 1000, // 5 минут
 });
}

export function useAdminTopicQuery(id: string) {
  return useQuery<Topic>({
    queryKey: ['admin-topic', id],
    queryFn: async () => {
      const result = await adminTopicsApi.getById(id);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
 });
}

export function useCreateAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminTopicsApi.create,
    onSuccess: () => {
      // Инвалидируем кэш тем после создания
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
    },
  });
}

export function useUpdateAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (variables: { id: string; topicData: UpdateTopicDto }) => 
      adminTopicsApi.update(variables.id, variables.topicData),
    onSuccess: () => {
      // Инвалидируем кэш тем после обновления
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-topic'] });
    },
  });
}

export function useDeleteAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminTopicsApi.delete,
    onSuccess: () => {
      // Инвалидируем кэш тем после удаления
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
    },
  });
}