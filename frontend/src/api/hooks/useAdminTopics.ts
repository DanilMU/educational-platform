import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApiAdapter } from '../requests/admin-adapter';
import { Topic, PaginatedTopicsDto, CreateTopicDto, UpdateTopicDto } from '../types';
import { adminCoursesApi } from '../requests/admin-wrapper';

interface GetAdminTopicsQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminTopicsQuery({ skip, take }: GetAdminTopicsQueryProps) {
  // Для получения тем администратором будем использовать адаптер
  // Так как админ API для тем пока не реализован, используем обычный API
  // Но в будущем можно будет добавить отдельный эндпоинт для админских тем
  return useQuery<PaginatedTopicsDto>({
    queryKey: ['admin-topics', skip, take],
    queryFn: async () => {
      // Заглушка: используем обычный API для получения тем, но в будущем можно добавить отдельный админский эндпоинт
      // Пока что возвращаем пустой результат, так как админский эндпоинт для тем не реализован
      return { data: [], total: 0 };
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Альтернативный подход - получить темы через курс (поскольку темы принадлежат курсам)
export function useAdminTopicsBySubjectQuery(subjectId?: string) {
  return useQuery({
    queryKey: ['admin-topics-by-subject', subjectId],
    queryFn: async () => {
      if (!subjectId) {
        return { data: [], total: 0 };
      }
      // Временно используем обычный API, так как админский эндпоинт для тем не реализован
      // В будущем можно будет реализовать отдельный эндпоинт
      return { data: [], total: 0 };
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    enabled: !!subjectId,
  });
}

// Пока используем обычные мутации, но в админке можно будет расширить функционал
export function useCreateAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTopicDto) => adminCoursesApi.create(data), // заглушка
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-topics-by-subject'] });
    },
  });
}

export function useUpdateAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateTopicDto }) => 
      adminCoursesApi.update(variables.id, variables.data), // заглушка
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-topics-by-subject'] });
      queryClient.invalidateQueries({ queryKey: ['admin-topic'] });
    },
  });
}

export function useDeleteAdminTopicMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => adminCoursesApi.delete(id), // заглушка
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-topics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-topics-by-subject'] });
    },
  });
}