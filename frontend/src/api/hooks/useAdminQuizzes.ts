import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminQuizzesApi } from '../requests/admin-wrapper'
import { Quiz, CreateQuizDto, UpdateQuizDto } from '../types'

export function useAdminQuizzesQuery() {
	return useQuery<Quiz[]>({
		queryKey: ['admin-quizzes'],
		queryFn: () => adminQuizzesApi.getAll(),
		staleTime: 5 * 60 * 1000, // 5 минут
	})
}

export function useAdminQuizQuery(id: string) {
	return useQuery<Quiz>({
		queryKey: ['admin-quiz', id],
		queryFn: () => adminQuizzesApi.getById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	})
}

export function useCreateAdminQuizMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (quizData: CreateQuizDto) => adminQuizzesApi.create(quizData),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] })
			// Инвалидируем кэш для проверки наличия теста и получения теста по ID урока
			if (data.lessonId) {
				queryClient.invalidateQueries({ queryKey: ['quiz-exists', data.lessonId] })
				queryClient.invalidateQueries({ queryKey: ['get quiz by lesson id', data.lessonId] })
			}
		},
	})
}

export function useUpdateAdminQuizMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (variables: { id: string; quizData: UpdateQuizDto }) =>
			adminQuizzesApi.update(variables.id, variables.quizData),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] })
			queryClient.invalidateQueries({ queryKey: ['admin-quiz', variables.id] })
			// Инвалидируем кэш для проверки наличия теста и получения теста по ID урока
			if (data.lessonId) {
				queryClient.invalidateQueries({ queryKey: ['quiz-exists', data.lessonId] })
				queryClient.invalidateQueries({ queryKey: ['get quiz by lesson id', data.lessonId] })
			}
		},
	})
}

export function useDeleteAdminQuizMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			// Получаем информацию о тесте перед удалением, чтобы знать lessonId
			const quiz = await adminQuizzesApi.getById(id);
			const result = await adminQuizzesApi.delete(id);
			return { ...result, lessonId: quiz.lessonId };
		},
		onSuccess: (data, id) => {
			queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] })
			// Инвалидируем кэш для проверки наличия теста и получения теста по ID урока
			if (data.lessonId) {
				queryClient.invalidateQueries({ queryKey: ['quiz-exists', data.lessonId] })
				queryClient.invalidateQueries({ queryKey: ['get quiz by lesson id', data.lessonId] })
			}
		},
	})
}
