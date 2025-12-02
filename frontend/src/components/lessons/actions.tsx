'use client'
 
import { Button } from '@/src/components/ui/button'
import { ArrowLeft, ArrowRight, CheckCircle, FileQuestion } from 'lucide-react'
import Link from 'next/link'
import type { Lesson } from '@/src/api/types'
import { useMarkLessonAsCompletedMutation } from '@/src/api/hooks/useMarkLessonAsCompletedMutation'
import { toast } from 'sonner'
 
interface LessonActionsProps {
  lesson: Lesson
  prevLessonId?: string
  nextLessonId?: string
  isCompleted: boolean
  hasQuiz?: boolean
}
 
export function LessonActions({
  lesson,
  prevLessonId,
  nextLessonId,
  isCompleted,
  hasQuiz
}: LessonActionsProps) {
  const { mutate: markLessonAsCompleted, isPending } = useMarkLessonAsCompletedMutation({
    onSuccess: () => {
      toast.success('Урок успешно завершен!')
    },
    onError: () => {
      toast.error('Ошибка при завершении урока')
    }
  })
  
  const handleCompleteLesson = () => {
    markLessonAsCompleted({ lessonId: lesson.id })
  }
  
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
        ) : hasQuiz ? (
            <Button asChild>
                <Link href={`/lessons/${lesson.id}/quiz`}>
                    <FileQuestion className="mr-2 size-4" />
                    Пройти тест
                </Link>
            </Button>
        ) : (
          <Button onClick={handleCompleteLesson} disabled={isPending}>
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Завершаем...
              </>
            ) : (
              <>
                Завершить урок
              </>
            )}
          </Button>
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
