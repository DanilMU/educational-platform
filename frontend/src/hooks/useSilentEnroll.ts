import { useEffect, useRef } from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import {
	useGetEnrolledSubjectsQuery,
	useEnrollInSubjectMutation,
} from '@/src/api/hooks'

export function useSilentEnroll(subjectId: string) {
	const { isAuthorized, user } = useAuth()
	const { data: enrolledSubjects, isLoading: enrolledLoading } =
		useGetEnrolledSubjectsQuery(user?.id || '')
	const { mutate: enroll, isPending } = useEnrollInSubjectMutation({
		silent: true,
	})

	// Ref to prevent multiple enrollment attempts for the same subject
	const attemptedEnrollment = useRef<Set<string>>(new Set())

	useEffect(() => {
		// Don't do anything if not authorized, or data is loading, or already attempting to enroll
		if (!isAuthorized || enrolledLoading || !enrolledSubjects || isPending) {
			return
		}

		// Check if enrollment was already attempted for this subject ID in this component instance
		if (attemptedEnrollment.current.has(subjectId)) {
			return
		}

		const isEnrolled = enrolledSubjects.some(s => s.id === subjectId)

		if (!isEnrolled) {
			enroll(subjectId)
			// Mark this subjectId as attempted for this component instance
			attemptedEnrollment.current.add(subjectId)
		}
	}, [
		isAuthorized,
		enrolledLoading,
		enrolledSubjects,
		subjectId,
		enroll,
		isPending,
	])
}
