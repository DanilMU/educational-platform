import { useEffect } from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import {
	useGetEnrolledSubjectsQuery,
	useEnrollInSubjectMutation,
} from '@/src/api/hooks'

export function useSilentEnroll(subjectId: string) {
	const { isAuthorized, user } = useAuth()
	const { data: enrolledSubjects, isLoading: enrolledLoading } =
		useGetEnrolledSubjectsQuery(user?.id || '', { enabled: isAuthorized })
	const enrollMutation = useEnrollInSubjectMutation({ silent: true })

	useEffect(() => {
		if (isAuthorized && !enrolledLoading && enrolledSubjects) {
			const isEnrolled = enrolledSubjects.some(s => s.id === subjectId)
			if (!isEnrolled) {
				enrollMutation.mutate(subjectId)
			}
		}
	}, [isAuthorized, enrolledLoading, enrolledSubjects, subjectId, enrollMutation])
}
