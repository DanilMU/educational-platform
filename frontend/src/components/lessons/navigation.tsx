'use client'

import Link from 'next/link'
import { cn } from '@/src/lib/utils'

type Lesson = {
  id: string
  title: string
}

interface LessonNavigationProps {
  lessons: Lesson[]
  currentLessonId: string
}

export function LessonNavigation({
  lessons,
  currentLessonId,
}: LessonNavigationProps) {
  return (
    <aside className="hidden h-screen w-80 min-h-screen border-r bg-white p-4 md:block">
      <h3 className="mb-4 text-lg font-semibold">Уроки в теме</h3>
      <ul className="space-y-2">
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <Link
              href={`/lessons/${lesson.id}`}
              className={cn(
                'block rounded-md p-3 transition-colors',
                lesson.id === currentLessonId
                  ? 'bg-blue-800/20 text-blue-800'
                  : 'hover:bg-gray-100'
              )}
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
