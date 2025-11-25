'use client'

import { Button } from '@/src/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface QuestionNavigationProps {
  currentQuestionIndex: number
  totalQuestions: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
}

export function QuestionNavigation({
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onPrev,
  onSubmit,
}: QuestionNavigationProps) {
  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentQuestionIndex === 0}
      >
        <ArrowLeft className="mr-2 size-4" />
        Назад
      </Button>
      {currentQuestionIndex < totalQuestions - 1 ? (
        <Button onClick={onNext}>
          Далее
          <ArrowRight className="ml-2 size-4" />
        </Button>
      ) : (
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
          Завершить тест
        </Button>
      )}
    </div>
  )
}
