'use client'

import type { Quiz } from '@/src/api/types'
import { Timer } from './timer'

interface QuizHeaderProps {
  quiz: Quiz
  onTimeUp: () => void
}

export function QuizHeader({ quiz, onTimeUp }: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      <div>
        <h2 className="text-2xl font-bold">{quiz.title}</h2>
        <p className="text-muted-foreground">Тест для проверки ваших знаний</p>
      </div>
      {quiz.timeLimit && (
        <Timer initialTime={quiz.timeLimit * 60} onTimeUp={onTimeUp} />
      )}
    </div>
  )
}
