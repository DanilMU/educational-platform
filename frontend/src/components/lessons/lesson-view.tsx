'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  useGetLessonByIdQuery,
  useGetTopicByIdQuery,
  useCheckQuizExists,
  useGetUserProgressQuery,
  useGetSubjectByIdQuery
} from '@/src/api/hooks'
import { LessonContentEnhanced } from '@/src/components/lessons/content-enhanced'
import { LessonActions } from '@/src/components/lessons/actions'
import { FloatingProgress } from '@/src/components/lessons/floating-progress'
import { Skeleton } from '@/src/components/ui/skeleton'
import { CourseNavigation } from '@/src/components/lessons/course-navigation'

interface LessonViewProps {
  lessonId: string
}

export function LessonView({ lessonId }: LessonViewProps) {
  const contentRef = useRef<HTMLElement>(null)

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useGetLessonByIdQuery(lessonId)

  const { data: topic, isLoading: isTopicLoading } = useGetTopicByIdQuery(
    lesson?.topicId ?? '',
    {
      enabled: !!lesson?.topicId,
    }
  )

  const { data: subject, isLoading: isSubjectLoading } = useGetSubjectByIdQuery(
    topic?.subjectId ?? '',
    {
      enabled: !!topic?.subjectId,
    }
  )

  const { data: hasQuiz, isLoading: isQuizLoading } = useCheckQuizExists(lesson?.id ?? '', {
    enabled: !!lesson?.id,
 })
  
  const { data: progressData, isLoading: isProgressLoading } = useGetUserProgressQuery();

  if (isLessonLoading || isTopicLoading || isSubjectLoading || isQuizLoading || isProgressLoading) {
    return (
      <div className="flex">
        <Skeleton className="hidden h-screen w-80 min-h-screen border-r md:block" />
        <div className="flex-1 p-6">
          <Skeleton className="h-12 w-2/3 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (isLessonError || !lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Не удалось загрузить урок.</p>
      </div>
    )
  }
  
  const lessonsInTopic = topic?.lessons || []
  const lessonIndex = lessonsInTopic.findIndex(l => l.id === lessonId)
  const isCompleted = !!progressData?.find(p => p.lessonId === lessonId && p.isCompleted);

  return (
    <div className="bg-gradient-to-br from-blue-800/10 via-white to-purple-50">
      <div className="flex">
        {topic && subject && (
          <CourseNavigation 
            topics={subject.topics} 
            currentLessonId={lessonId} 
            subjectId={subject.id}
            subjectTitle={subject.title}
          />
        )}
        {!topic && (
          <div className="w-80 min-h-screen border-r bg-muted/20 p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Прогресс курса</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Загрузка...</span>
              </div>
            </div>
          </div>
        )}
        <main ref={contentRef} className="min-h-screen flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LessonContentEnhanced lesson={{
            	id: lesson.id,
            	title: lesson.title,
            	difficulty: lesson.difficulty ?? 1,
            	estimatedTime: lesson.estimatedTime ?? 0,
            	learningObjectives: lesson.learningObjectives ?? "",
            	content: lesson.content,
            	attachments: lesson.attachments,
            	videoUrl: lesson.videoUrl
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LessonActions
              lesson={lesson}
              prevLessonId={lessonIndex > 0 ? lessonsInTopic[lessonIndex - 1].id : undefined}
              nextLessonId={lessonIndex < lessonsInTopic.length - 1 ? lessonsInTopic[lessonIndex + 1].id : undefined}
              isCompleted={isCompleted}
              {...(hasQuiz !== undefined && { hasQuiz })}
            />
          </motion.div>
        </main>
      </div>

      <FloatingProgress targetRef={contentRef} />
    </div>
  )
}