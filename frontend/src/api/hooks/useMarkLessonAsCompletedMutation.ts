import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markLessonAsCompleted } from '../requests/progress'
import type { Progress } from '../types'

interface MarkLessonAsCompletedVariables {
  lessonId: string
}

export function useMarkLessonAsCompletedMutation(
  options?: {
    onSuccess?: (data: Progress, variables: MarkLessonAsCompletedVariables, context: unknown) => void
    onError?: (error: unknown, variables: MarkLessonAsCompletedVariables, context: unknown) => void
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId }: MarkLessonAsCompletedVariables) => markLessonAsCompleted(lessonId),
    onSuccess: (data, variables, context) => {
      // Инвалидируем кэш прогресса пользователя для обновления данных
      queryClient.invalidateQueries({ queryKey: ['get user progress'] })
      queryClient.invalidateQueries({ queryKey: ['get enrolled subjects'] })
      queryClient.invalidateQueries({ queryKey: ['analytics', 'current-user'] })
      
      // Вызываем пользовательский колбэк onSuccess, если он предоставлен
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      // Вызываем пользовательский колбэк onError, если он предоставлен
      if (options?.onError) {
        options.onError(error, variables, context)
      }
    }
  })
}