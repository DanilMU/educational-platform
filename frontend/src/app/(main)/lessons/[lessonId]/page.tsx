import { LessonDetails } from '@/src/components/lessons/details/lesson-details'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Урок',
}

interface LessonPageProps {
	params: {
		lessonId: string
	}
}

export default function LessonPage({ params }: LessonPageProps) {
	return <LessonDetails lessonId={params.lessonId} />
}
