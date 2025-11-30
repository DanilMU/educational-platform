'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks/useGetEnrolledSubjectsQuery'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useAuth } from '@/src/hooks/useAuth'

export function ActiveCoursesSection() {
  const { user } = useAuth();
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

  // Используем topics из LearningPathDto для отображения активных курсов
  const subjectsForCard = enrolledSubjects?.topics?.map(topic => ({
    id: topic.id || '',
    title: topic.title || '',
    description: 'Описание отсутствует', // Пока что ставим заглушку, т.к. поля description нет в типе
    progress: 0, // Пока что ставим заглушку, т.к. поля progress нет в типе
    lessons: Array.isArray(topic.lessons) ? topic.lessons.length : 0,
    category: 'Тема'
  })) || []

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
