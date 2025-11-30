'use client'

import { useGetSubjectByIdQuery } from '@/src/api/hooks/useGetSubjectByIdQuery'
import { TopicAccordion } from './topic-accordion'
import { Skeleton } from '@/src/components/ui/skeleton'

interface SubjectDetailsProps {
	subjectId: string
}

export function SubjectDetails({ subjectId }: SubjectDetailsProps) {
	const { data: subject, isLoading, isError } = useGetSubjectByIdQuery(subjectId)

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<Skeleton className='h-10 w-2/3' />
				<Skeleton className='h-5 w-full' />
				<Skeleton className='h-5 w-5/6' />
				<div className='space-y-4 pt-6'>
					<Skeleton className='h-12 w-full' />
					<Skeleton className='h-12 w-full' />
					<Skeleton className='h-12 w-full' />
				</div>
			</div>
		)
	}

	if (isError || !subject) {
		return (
			<div className='flex h-64 items-center justify-center'>
				<p className='text-red-500'>
					{isError
						? 'Произошла ошибка при загрузке курса.'
						: 'Курс не найден.'}
				</p>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-4xl font-bold'>{subject.title}</h1>
				<p className='mt-2 text-lg text-gray-600'>
					{String(subject.description || '')}
				</p>
			</div>

			<div>
				<h2 className='mb-4 text-2xl font-bold'>Содержание курса</h2>
				<TopicAccordion topics={subject.topics} />
			</div>
		</div>
	)
}
