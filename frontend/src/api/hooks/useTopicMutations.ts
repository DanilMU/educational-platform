import { useMutation, useQueryClient } from '@tanstack/react-query';
import { topicsControllerCreate, topicsControllerUpdate, topicsControllerRemove } from '../generated-client';
import type { CreateTopicDto, UpdateTopicDto, Topic } from '../types';

export function useCreateTopicMutation() {
  const queryClient = useQueryClient();
  return useMutation<Topic, Error, CreateTopicDto>({
    mutationFn: (data) => topicsControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
}

export function useUpdateTopicMutation() {
  const queryClient = useQueryClient();
  return useMutation<Topic, Error, { id: string; data: UpdateTopicDto }>({
    mutationFn: ({ id, data }) => topicsControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
}

export function useDeleteTopicMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => topicsControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
}
