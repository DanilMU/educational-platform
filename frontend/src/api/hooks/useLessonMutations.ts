import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
	lessonsControllerCreate,
	lessonsControllerUpdate,
	lessonsControllerRemove
} from '../generated-client';
import {
	CreateLessonDto,
	Lesson,
	UpdateLessonDto
} from '../types';

export function useCreateLessonMutation() {
	const queryClient = useQueryClient();
	return useMutation<Lesson, Error, CreateLessonDto>({
		mutationFn: (data: CreateLessonDto) => lessonsControllerCreate(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lessons'] });
		}
	});
}

export function useUpdateLessonMutation() {
	const queryClient = useQueryClient();
	return useMutation<Lesson, Error, { id: string; data: UpdateLessonDto }>({
		mutationFn: ({ id, data }) => lessonsControllerUpdate(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lessons'] });
		}
	});
}

export function useDeleteLessonMutation() {
	const queryClient = useQueryClient();
	return useMutation<void, Error, string>({
		mutationFn: (id: string) => lessonsControllerRemove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lessons'] });
		}
	});
}
