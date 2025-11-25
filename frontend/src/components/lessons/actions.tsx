'use client'

import { Button } from '@/src/components/ui/button'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { Lesson } from '@/src/api/types'

interface LessonActionsProps {
  lesson: Lesson
  prevLessonId?: string
  nextLessonId?: string
  isCompleted: boolean
}

export function LessonActions({
  lesson,
  prevLessonId,
  nextLessonId,
  isCompleted,
}: LessonActionsProps) {
  return (
    <div className="mx-auto mt-8 flex max-w-4xl justify-between border-t p-6">
      <div>
        {prevLessonId && (
          <Button asChild variant="outline">
            <Link href={`/lessons/${prevLessonId}`}>
              <ArrowLeft className="mr-2 size-4" />
              Предыдущий урок
            </Link>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <Button variant="ghost" disabled className="text-green-600">
            <CheckCircle className="mr-2 size-4" />
            Урок пройден
          </Button>
        ) : (
          <Button>Завершить урок</Button>
        )}
        {nextLessonId && (
          <Button asChild variant="default">
            <Link href={`/lessons/${nextLessonId}`}>
              Следующий урок
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
