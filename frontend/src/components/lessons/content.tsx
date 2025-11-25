'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/src/components/animations/ScrollReveal'
import { Badge } from '@/src/components/ui/badge'
import { Paperclip } from 'lucide-react'

// This type should be replaced with actual types from the API client.
export type Lesson = {
  id: string
  title: string
  difficulty: number
  estimatedTime: number
  learningObjectives: string
  content: string
  attachments?: string[]
}

interface LessonContentProps {
  lesson: Lesson
}

function AttachmentCard({ attachment }: { attachment: string }) {
  return (
    <a
      href={attachment}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
    >
      <Paperclip className="size-6 text-gray-500" />
      <div className="flex-1">
        <p className="font-semibold">
          {attachment.split('/').pop() || 'Скачать материал'}
        </p>
        <p className="text-sm text-muted-foreground">PDF документ</p>
      </div>
    </a>
  )
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Заголовок урока */}
      <ScrollReveal>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-4">
            <Badge variant="outline">{lesson.difficulty}/5</Badge>
            <span className="text-sm text-muted-foreground">
              ~{lesson.estimatedTime} мин
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold">{lesson.title}</h1>

          {lesson.learningObjectives && (
            <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
              <h3 className="mb-2 font-semibold">Цели обучения:</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                {lesson.learningObjectives
                  .split('\n')
                  .map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
              </ul>
            </div>
          )}
        </motion.div>
      </ScrollReveal>

      {/* Контент урока */}
      <ScrollReveal delay={0.2}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </motion.div>
      </ScrollReveal>

      {/* Вложения */}
      {lesson.attachments && lesson.attachments.length > 0 && (
        <ScrollReveal delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h3 className="mb-4 text-lg font-semibold">
              Материалы для скачивания:
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {lesson.attachments.map((attachment, index) => (
                <AttachmentCard key={index} attachment={attachment} />
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      )}
    </div>
  )
}
