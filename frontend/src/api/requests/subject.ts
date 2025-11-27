import { instance } from '../instance'
import { Subject } from '../types/subject'
import { EnrolledSubject } from '../types/enrolled-subject'
import { getProgress } from './progress'

export const getEnrolledSubjects = async (): Promise<EnrolledSubject[]> => {
	const [subjects, userProgress] = await Promise.all([
		instance.get<Subject[]>('/subjects').then(res => res.data),
		getProgress(),
	])

	const completedLessonIds = new Set(
		userProgress.filter(p => p.isCompleted).map(p => p.lessonId)
	)

	return subjects.map(subject => {
		const allLessonIds = (subject.topics || []).flatMap(topic =>
			topic.lessons ? topic.lessons.map(lesson => lesson.id) : []
		)
		const totalLessons = allLessonIds.length
		const completedLessons = allLessonIds.filter(id =>
			completedLessonIds.has(id)
		).length

		const progress =
			totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

		return {
			...subject,
			name: subject.title,
			progress: Math.round(progress),
		}
	})
}

export const getSubjectById = async (id: string) => {
	return await instance.get<Subject>(`/subjects/${id}`).then(res => res.data)
}
