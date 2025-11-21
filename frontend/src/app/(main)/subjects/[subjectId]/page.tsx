import { SubjectDetails } from '@/src/components/subjects/details/subject-details'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Курс',
}

export default function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
	const { subjectId } = React.use(params)
	return <SubjectDetails subjectId={subjectId} />
}
