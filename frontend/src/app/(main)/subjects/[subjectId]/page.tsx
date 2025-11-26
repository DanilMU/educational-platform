'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Timeline } from '@/src/components/subjects/timeline'
import { LearningProgress } from '@/src/components/progress/learning-progress'
import { SubjectDetailsHeader } from '@/src/components/subjects/details/subject-details-header'
import { useGetSubjectByIdQuery } from '@/src/api/hooks/useGetSubjectByIdQuery'
import { useGetUserProgressQuery } from '@/src/api/hooks/useGetUserProgressQuery'

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>
}) {
  const { subjectId } = React.use(params)

  const { data: subject, isLoading, isError } = useGetSubjectByIdQuery(subjectId)
 const { data: progressData } = useGetUserProgressQuery()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (isError || !subject) {
    return <div>Ошибка при загрузке данных</div>
 }

  // Получаем список пройденных уроков из прогресса пользователя
  const completedLessons = progressData?.filter((p: { isCompleted: boolean }) => p.isCompleted).map((p: { lessonId: string }) => p.lessonId) || []

  // Вычисляем общее количество уроков
  const totalLessons = subject.topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0)

  // Определяем текущую тему (например, первую непройденную тему)
  const currentTopic = subject.topics.find(topic => {
    return topic.lessons?.some(lesson => !completedLessons.includes(lesson.id))
  })?.title || subject.topics[0]?.title

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SubjectDetailsHeader subject={subject} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12"
      >
        <LearningProgress
          totalLessons={totalLessons}
          completedLessons={completedLessons.length}
          currentTopic={currentTopic}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Timeline topics={subject.topics} completedLessons={completedLessons} />
      </motion.div>
    </div>
  )
}
