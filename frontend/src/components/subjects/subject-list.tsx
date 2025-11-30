'use client'

import { useGetSubjectsQuery } from '@/src/api/hooks/useGetSubjectsQuery'
import { SubjectCard, SubjectCardSkeleton } from './subject-card'

export function SubjectList() {
	const { data: paginatedData, isLoading, isError } = useGetSubjectsQuery()

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 6 }).map((_, i) => (
					<SubjectCardSkeleton key={i} />
				))}
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex justify-center items-center h-64'>
				<p className='text-red-500'>
					Произошла ошибка при загрузке курсов.
				</p>
			</div>
		)
	}

	const subjects = paginatedData?.data || [];

	if (!subjects || subjects.length === 0) {
		return (
			<div className='flex justify-center items-center h-64'>
				<p className='text-gray-500'>
					Курсы не найдены.
				</p>
			</div>
	)
	}

	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
			{subjects.map((subject) => (
				<SubjectCard key={subject.id} subject={subject} />
			))}
		</div>
	)
}
