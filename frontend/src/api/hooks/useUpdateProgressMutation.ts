import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { updateProgress } from '../requests/progress'
import type { Progress, UpdateProgressDto } from '../types'

interface UpdateProgressVariables {
    lessonId: string
    data: UpdateProgressDto
}

export function useUpdateProgressMutation(
    options?: Omit<
        UseMutationOptions<Progress, unknown, UpdateProgressVariables>,
        'mutationKey' | 'mutationFn'
    >
) {
    return useMutation({
        mutationKey: ['update progress'],
        mutationFn: ({ lessonId, data }: UpdateProgressVariables) => updateProgress(lessonId, data),
        ...options,
    })
}
