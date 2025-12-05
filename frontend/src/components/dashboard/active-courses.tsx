'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { Skeleton } from '@/src/components/ui/skeleton'
import type { Subject, Progress } from '@/src/api/types'

interface ActiveCoursesSectionProps {
  enrolledSubjects: Subject[]
  progressData: Progress[]
}

export function ActiveCoursesSection({ enrolledSubjects, progressData }: ActiveCoursesSectionProps) {
  if (!enrolledSubjects || enrolledSubjects.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">Нет активных курсов</p>
        </div>
      </div>
    )
  }

  const subjectsForCard = enrolledSubjects.map(subject => {
    const totalLessons = subject.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0
    const completedLessons = progressData?.filter(p => 
      p.isCompleted &&
      subject.topics?.some(topic => 
        topic.lessons?.some(lesson => lesson.id === p.lessonId)
      )
    ).length || 0
    
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return {
      ...subject,
      id: subject.id || '',
      title: subject.title || '',
      description: subject.description,
      progress: progress,
      lessonsCount: totalLessons,
      category: 'Курс',
      isEnrolled: true,
    }
  })

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjectsForCard.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  )
}
