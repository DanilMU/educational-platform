'use client'

import { Progress } from '@/src/components/ui/progress'

interface LearningProgressProps {
  totalLessons: number
  completedLessons: number
  currentTopic: string
}

export function LearningProgress({
  totalLessons,
  completedLessons,
  currentTopic,
}: LearningProgressProps) {
  const progress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ваш прогресс</h3>
        <span className="text-sm font-bold text-blue-800">
          {completedLessons} из {totalLessons} уроков
        </span>
      </div>
      <Progress value={progress} className="my-4 h-2" />
      <div className="text-sm text-muted-foreground">
        <span>Текущая тема: </span>
        <span className="font-semibold text-gray-800">{currentTopic}</span>
      </div>
    </div>
  )
}
