'use client'

import { useAuth } from '@/src/hooks/useAuth'
import { useGetEnrolledSubjectsQuery, useGetMeQuery } from '@/src/api/hooks'
import { BookOpen } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { EnrolledSubjectCard, EnrolledSubjectCardSkeleton } from './enrolled-subject-card'

export function EnrolledSubjectsList() {
	const { isAuthorized } = useAuth()
	const { data: user } = useGetMeQuery();
	const { data: subjects = [], isLoading, isError } = useGetEnrolledSubjectsQuery(user?.id || '')

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 6 }).map((_, i) => (
					<EnrolledSubjectCardSkeleton key={i} />
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

	if (!subjects || subjects.length === 0) {
		return (
			<div className='py-12 text-center'>
				<div className='mx-auto mb-4 size-12 text-gray-300 flex justify-center'>
					<BookOpen className='size-12' />
				</div>
				<h3 className='mb-2 text-lg font-semibold text-gray-900'>
					Вы еще не записаны на курсы
				</h3>
				<p className='mb-6 text-gray-600'>
					Начните свое обучение, выбрав один из доступных
					курсов.
				</p>
				<Button asChild>
					<Link href='/subjects'>Перейти к курсам</Link>
				</Button>
			</div>
	)
	}

	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
			{subjects.map((subject) => (
				<EnrolledSubjectCard key={subject.id} subject={subject} />
			))}
		</div>
	)
}