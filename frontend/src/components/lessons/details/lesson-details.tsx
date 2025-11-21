'use client'

import { useGetLessonByIdQuery } from '@/src/api/hooks/useGetLessonByIdQuery'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import Link from 'next/link'

interface LessonDetailsProps {
	lessonId: string
}

export function LessonDetails({ lessonId }: LessonDetailsProps) {
	const { data: lesson, isLoading, isError } = useGetLessonByIdQuery(lessonId)

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<Skeleton className='h-10 w-2/3' />
				<div className='space-y-4'>
					<Skeleton className='h-5 w-full' />
					<Skeleton className='h-5 w-full' />
					<Skeleton className='h-5 w-5/6' />
					<Skeleton className='h-5 w-full' />
					<Skeleton className='h-5 w-3/4' />
				</div>
			</div>
		)
	}

	if (isError || !lesson) {
		return (
			<div className='flex h-64 items-center justify-center'>
				<p className='text-red-500'>
					{isError
						? 'Произошла ошибка при загрузке урока.'
						: 'Урок не найден.'}
				</p>
			</div>
		)
	}

	return (
		<div>
			<article className='prose prose-lg max-w-none'>
				<h1>{lesson.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: lesson.content }} />
			</article>
			<div className='mt-8'>
				<Button asChild>
					<Link href={`/lessons/${lessonId}/quiz`}>Пройти тест</Link>
				</Button>
			</div>
		</div>
	)
}
