'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks/useGetEnrolledSubjectsQuery'
import { Skeleton } from '@/src/components/ui/skeleton'

export function ActiveCoursesSection() {
  const { data: enrolledSubjects, isLoading, isError } = useGetEnrolledSubjectsQuery()

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

  // Преобразуем данные в формат, ожидаемый SubjectCard
  const subjectsForCard = enrolledSubjects?.map(subject => ({
    id: subject.id,
    title: subject.title,
    description: subject.description ? String(subject.description) : 'Описание отсутствует',
    progress: subject.progress || 0,
    lessons: subject.topics ? subject.topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) : 0,
    category: 'Курс'
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
