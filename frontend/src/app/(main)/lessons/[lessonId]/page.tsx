'use client'
 
import React from 'react'
import { LessonView } from '@/src/components/lessons/lesson-view'

export default function LessonPage({
	params,
}: {
	params: Promise<{ lessonId: string }>
}) {
	const { lessonId } = React.use(params)

	return <LessonView lessonId={lessonId} />
}
