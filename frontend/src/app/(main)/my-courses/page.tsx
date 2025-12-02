import type { Metadata } from 'next'
import { MyCoursesEnhanced } from '@/src/components/my-courses/my-courses-enhanced'

export const metadata: Metadata = {
	title: 'Мои курсы',
}

export default function MyCoursesPage() {
	return <MyCoursesEnhanced />
}