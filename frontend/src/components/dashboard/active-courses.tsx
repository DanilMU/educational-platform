'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks/useGetEnrolledSubjectsQuery'
import { useGetMeQuery } from '@/src/api/hooks'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useAuth } from '@/src/hooks/useAuth'

export function ActiveCoursesSection() {
  const { isAuthorized } = useAuth();
  const { data: user } = useGetMeQuery();
  const { data: enrolledSubjects, isLoading, isError } = useGetEnrolledSubjectsQuery(user?.id || '')

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
        <div className="text-center py-8 text-muted-foreground">
          Не удалось загрузить активные курсы
        </div>
      </div>
    )
  }

  // Теперь enrolledSubjects - это массив курсов (Subject[])
  const subjectsForCard = enrolledSubjects && Array.isArray(enrolledSubjects) ? enrolledSubjects.map(subject => ({
    id: subject.id || '',
    title: subject.title || '',
    description: subject.description || 'Описание отсутствует',
    progress: 0, // Пока что ставим заглушку, т.к. поля progress нет в типе
    lessons: 0, // Пока что ставим заглушку
    category: 'Курс'
  })) : []

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjectsForCard.length > 0 ? (
          subjectsForCard.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Нет активных курсов</p>
          </div>
        )}
      </div>
    </div>
  )
}
