'use client'

import { useGetSubjectsQuery, useGetEnrolledSubjectsQuery, useGetMeQuery } from '@/src/api/hooks'
import { SubjectCard, SubjectCardSkeleton } from './subject-card'

export function SubjectList() {
	const { data: paginatedData, isLoading: isSubjectsLoading, isError: isSubjectsError } = useGetSubjectsQuery()
	const { data: user } = useGetMeQuery();
	const { data: enrolledSubjects = [], isLoading: isEnrolledLoading, isError: isEnrolledError } = useGetEnrolledSubjectsQuery(user?.id || '')

	const isLoading = isSubjectsLoading || isEnrolledLoading;
	const isError = isSubjectsError || isEnrolledError;

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
			{subjects.map((subject) => {
				// Проверяем, записан ли пользователь на этот курс
				const isEnrolled = enrolledSubjects.some(enrolledSubject => enrolledSubject.id === subject.id);
				// Создаем обновленный объект subject с информацией о записи
				const subjectWithEnrollmentStatus = { ...subject, isEnrolled };
				return (
					<SubjectCard key={subject.id} subject={subjectWithEnrollmentStatus} />
				);
			})}
		</div>
	)
}
