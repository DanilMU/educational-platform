import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enrollInSubject } from '../requests/subject'
import type { Subject } from '../types'
import { toast } from 'sonner'

interface EnrollOptions {
	silent?: boolean
}

export function useEnrollInSubjectMutation(options?: EnrollOptions) {
	const queryClient = useQueryClient()

	return useMutation<Subject, Error, string>({
		mutationFn: async (subjectId: string) => {
			const response = await enrollInSubject(subjectId)
			return response
		},
		onSuccess: newlyEnrolledSubject => {
			if (!options?.silent) {
				toast.success('Вы успешно записались на курс!')
			}

			// Invalidate queries to refetch data in the background
			queryClient.invalidateQueries({ queryKey: ['get enrolled subjects'] })
			queryClient.invalidateQueries({ queryKey: ['me'] })
			queryClient.invalidateQueries({ queryKey: ['get user progress'] })
		},
		onError: error => {
			if (!options?.silent) {
				if (error.message.includes('Subject not found')) {
					toast.error(
						'Курс не найден. Возможно, он был удален или временно недоступен.'
					)
				} else if (error.message.includes('Subject is not published')) {
					toast.error(
						'Курс еще не опубликован и временно недоступен для записи.'
					)
				} else {
					toast.error(
						'Произошла ошибка при записи на курс. Пожалуйста, попробуйте еще раз.'
					)
				}
			}
		},
	})
}