import type { Metadata } from 'next'
import { MyCoursesPageClient } from '@/src/components/my-courses/my-courses-page-client'

export const metadata: Metadata = {
	title: 'Мои курсы',
}

export default function MyCoursesPage() {
	return <MyCoursesPageClient />
}