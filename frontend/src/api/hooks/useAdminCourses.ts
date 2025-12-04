import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminCoursesApi } from '../requests/admin-wrapper';
import { Subject, PaginatedSubjectsDto, UpdateSubjectDto } from '../types';
import { adminApiAdapter } from '../requests/admin-adapter';

interface GetAdminCoursesQueryProps {
  skip?: number;
  take?: number;
}

export function useAdminCoursesQuery({ skip, take }: GetAdminCoursesQueryProps) {
  return useQuery<PaginatedSubjectsDto>({
    queryKey: ['admin-courses', skip, take],
    queryFn: async () => {
      return await adminApiAdapter.getAllCourses({ skip: skip?.toString(), take: take?.toString() });
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useAdminCourseQuery(id: string) {
  return useQuery<Subject>({
    queryKey: ['admin-course', id],
    queryFn: async () => {
      const result = await adminCoursesApi.getById(id);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useCreateAdminCourseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminCoursesApi.create,
    onSuccess: () => {
      // Инвалидируем кэш курсов после создания
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses-extended'] });
      // Также инвалидируем кэш для пользовательской страницы курсов
      queryClient.invalidateQueries({ queryKey: ['get all subjects'] });
    },
  });
}

export function useUpdateAdminCourseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (variables: { id: string; courseData: UpdateSubjectDto }) =>
      adminCoursesApi.update(variables.id, variables.courseData),
    onSuccess: () => {
      // Инвалидируем кэш курсов после обновления
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-course'] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses-extended'] });
      // Также инвалидируем кэш для пользовательской страницы курсов
      queryClient.invalidateQueries({ queryKey: ['get all subjects'] });
    },
  });
}

export function useDeleteAdminCourseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminCoursesApi.delete,
    onSuccess: () => {
      // Инвалидируем кэш курсов после удаления
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses-extended'] });
      // Также инвалидируем кэш для пользовательской страницы курсов
      queryClient.invalidateQueries({ queryKey: ['get all subjects'] });
    },
  });
}