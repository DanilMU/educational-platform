'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
	useGetLessonByIdQuery,
	useGetTopicByIdQuery,
} from '@/src/api/hooks'
import { LessonNavigation } from '@/src/components/lessons/navigation'
import { LessonContent } from '@/src/components/lessons/content'
import { LessonActions } from '@/src/components/lessons/actions'
import { FloatingProgress } from '@/src/components/lessons/floating-progress'
import { Skeleton } from '@/src/components/ui/skeleton'

export default function LessonPage({
  params,
}: {
  params: { lessonId: string }
}) {
  const { lessonId } = params
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

  if (isLessonLoading || (!!lesson?.topicId && isTopicLoading)) {
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

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex">
        <LessonNavigation lessons={lessonsInTopic} currentLessonId={lessonId} />
        <main ref={contentRef} className="min-h-screen flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LessonContent lesson={{
              id: lesson.id,
              title: lesson.title,
              difficulty: lesson.difficulty ?? 1, // значение по умолчанию
              estimatedTime: lesson.estimatedTime ?? 0, // значение по умолчанию
              learningObjectives: lesson.learningObjectives ?? "", // значение по умолчанию
              content: lesson.content,
              attachments: lesson.attachments
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LessonActions
              lesson={{
                id: lesson.id,
                title: lesson.title,
                content: lesson.content,
                topicId: lesson.topicId,
                estimatedTime: lesson.estimatedTime,
                difficulty: lesson.difficulty,
                learningObjectives: lesson.learningObjectives,
                prerequisites: lesson.prerequisites,
                videoUrl: lesson.videoUrl,
                attachments: lesson.attachments,
                order: lesson.order,
                createdAt: lesson.createdAt,
                updatedAt: lesson.updatedAt
              }}
              prevLessonId={lessonIndex > 0 ? lessonsInTopic[lessonIndex - 1].id : undefined}
              nextLessonId={lessonIndex < lessonsInTopic.length - 1 ? lessonsInTopic[lessonIndex + 1].id : undefined}
              isCompleted={false} // This needs real progress data later
            />
          </motion.div>
        </main>
      </div>

      <FloatingProgress targetRef={contentRef} />
    </div>
  )
}
