import { QuizViewEnhanced } from '@/src/components/lessons/quiz/quiz-view-enhanced'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Тест',
}

export default function QuizPage({ params }: { params: Promise<{ lessonId: string }> }) {
	const { lessonId } = React.use(params)
	return <QuizViewEnhanced lessonId={lessonId} />
}
