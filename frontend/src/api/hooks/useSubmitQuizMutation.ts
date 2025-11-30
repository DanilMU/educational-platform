import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { submitQuiz } from '../requests/quiz'
import type { SubmitQuizDto } from '../types'
import type { QuizResultDto } from '../types/quizResultDto'

export function useSubmitQuizMutation(
    quizId: string,
    options?: Omit<
        UseMutationOptions<QuizResultDto, unknown, SubmitQuizDto>,
        'mutationKey' | 'mutationFn'
    >
) {
    return useMutation({
        mutationKey: ['submit quiz', quizId],
        mutationFn: (data: SubmitQuizDto) => submitQuiz(quizId, data),
        ...options
    })
}
