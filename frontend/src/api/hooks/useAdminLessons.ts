import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminLessonsApi } from '../requests/admin-wrapper';
import { Lesson, PaginatedLessonsDto, UpdateLessonDto } from '../types';
import { adminApiAdapter } from '../requests/admin-adapter';

interface GetAdminLessonsQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminLessonsQuery({ skip, take }: GetAdminLessonsQueryProps) {
  return useQuery<PaginatedLessonsDto>({
    queryKey: ['admin-lessons', skip, take],
    queryFn: async () => {
      return await adminApiAdapter.getAllLessons({ skip: skip?.toString(), take: take?.toString() });
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useAdminLessonQuery(id: string) {
  return useQuery<Lesson>({
    queryKey: ['admin-lesson', id],
    queryFn: async () => {
      const result = await adminLessonsApi.getById(id);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useCreateAdminLessonMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminLessonsApi.create,
    onSuccess: () => {
      // Инвалидируем кэш уроков после создания
      queryClient.invalidateQueries({ queryKey: ['admin-lessons'] });
    },
  });
}

export function useUpdateAdminLessonMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (variables: { id: string; lessonData: UpdateLessonDto }) => 
      adminLessonsApi.update(variables.id, variables.lessonData),
    onSuccess: () => {
      // Инвалидируем кэш уроков после обновления
      queryClient.invalidateQueries({ queryKey: ['admin-lessons'] });
      queryClient.invalidateQueries({ queryKey: ['admin-lesson'] });
    },
  });
}

export function useDeleteAdminLessonMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminLessonsApi.delete,
    onSuccess: () => {
      // Инвалидируем кэш уроков после удаления
      queryClient.invalidateQueries({ queryKey: ['admin-lessons'] });
    },
  });
}