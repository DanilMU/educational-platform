import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectsControllerCreate, subjectsControllerUpdate, subjectsControllerRemove } from '../generated-client';
import type { CreateSubjectDto, UpdateSubjectDto, Subject } from '../types';

export function useCreateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation<Subject, Error, CreateSubjectDto>({
    mutationFn: (data) => subjectsControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
}

export function useUpdateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation<Subject, Error, { id: string; data: UpdateSubjectDto }>({
    mutationFn: ({ id, data }) => subjectsControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
}

export function useDeleteSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => subjectsControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
}
