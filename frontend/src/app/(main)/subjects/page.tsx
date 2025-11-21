import type { Metadata } from 'next'
import { SubjectList } from '@/src/components/subjects/subject-list'

export const metadata: Metadata = {
	title: 'Все курсы',
}

export default function SubjectsPage() {
	return (
		<div className='space-y-8'>
			<h1 className='text-3xl font-bold'>Все курсы</h1>
			<SubjectList />
		</div>
	)
}
