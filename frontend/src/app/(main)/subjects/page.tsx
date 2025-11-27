import type { Metadata } from 'next'
import { SubjectsPageClient } from '@/src/components/subjects/subjects-page-client'

export const metadata: Metadata = {
	title: 'Все курсы',
}

export default function SubjectsPage() {
	return <SubjectsPageClient />
}

