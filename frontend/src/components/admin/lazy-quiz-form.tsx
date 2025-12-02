'use client'

import { Skeleton } from '@/src/components/ui/skeleton'
import dynamic from 'next/dynamic'

const LazyQuizForm = dynamic(
	() => import('./quiz-form').then(mod => ({ default: mod.QuizForm })),
	{
		loading: () => (
			<div className='space-y-4'>
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-24 w-full' />
				<Skeleton className='h-40 w-full' />
			</div>
		),
		ssr: false,
	}
)

export default LazyQuizForm
