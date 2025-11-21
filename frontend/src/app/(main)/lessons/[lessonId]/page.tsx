import { LessonDetails } from '@/src/components/lessons/details/lesson-details'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Урок',
}

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
	const { lessonId } = React.use(params)
	return <LessonDetails lessonId={lessonId} />
}
