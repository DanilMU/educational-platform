'use client'

import { motion } from 'framer-motion'
import { Timeline } from '@/src/components/subjects/timeline'
import { LearningProgress } from '@/src/components/progress/learning-progress'
import { SubjectDetailsHeader } from '@/src/components/subjects/details/subject-details-header'

// Mock Data
const subject = {
  title: 'Охрана труда',
  description:
    'Комплексный курс по основам охраны труда, промышленной безопасности и управлению рисками на производстве.',
  author: 'Иван Иванов',
  rating: 4.8,
  reviews: 125,
}

const topics = [
  {
    id: 'topic1',
    title: 'Введение в охрану труда',
    lessons: [
      { id: 'lesson1', title: 'Основные понятия и определения' },
      { id: 'lesson2', title: 'Законодательство в области охраны труда' },
    ],
  },
  {
    id: 'topic2',
    title: 'Производственная санитария',
    lessons: [
      { id: 'lesson3', title: 'Вредные производственные факторы' },
      { id: 'lesson4', title: 'Средства индивидуальной защиты' },
    ],
  },
  {
    id: 'topic3',
    title: 'Пожарная безопасность',
    lessons: [
        { id: 'lesson5', title: 'Причины возникновения пожаров' },
        { id: 'lesson6', title: 'Действия при пожаре' },
    ],
  }
]

const completedLessons = ['lesson1', 'lesson2', 'lesson3']
const totalLessons = topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0)
const currentTopic = "Производственная санитария"

export default function SubjectPage({
  params,
}: {
  params: { subjectId: string }
}) {
  // const { subjectId } = params // We are using mock data for now

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
        <Timeline topics={topics} completedLessons={completedLessons} />
      </motion.div>
    </div>
  )
}
