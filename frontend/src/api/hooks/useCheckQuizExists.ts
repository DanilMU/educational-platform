import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { getQuizByLessonId } from '../requests/quiz'

export const useCheckQuizExists = (
  lessonId: string,
  options?: Omit<UseQueryOptions<boolean, unknown>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['quiz-exists', lessonId],
    queryFn: async () => {
      try {
        const quiz = await getQuizByLessonId(lessonId)
        return !!quiz
      } catch {
        // Если тест не найден (404), возвращаем false вместо ошибки
        return false
      }
    },
    enabled: !!lessonId,
    staleTime: 5 * 60 * 1000, // 5 минут
    ...options,
  })
}