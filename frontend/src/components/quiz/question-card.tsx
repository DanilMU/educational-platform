'use client'

import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Label } from '@/src/components/ui/label'

// Assuming these types are available
import type { Question } from '@/src/api/types'
import { QuestionType } from '@/src/api/types/questionType'

interface QuestionCardProps {
  question: Question
  selectedAnswers: string[]
  onAnswerChange: (answerId: string, checked: boolean) => void
  questionNumber: number
}

export function QuestionCard({
  question,
  selectedAnswers,
  onAnswerChange,
  questionNumber
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 rounded-lg border bg-card p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
          {questionNumber}
        </div>
        <div className="flex-1">
          <h3 className="mb-4 text-lg font-semibold">{question.text}</h3>

          {question.type === QuestionType.SINGLE_CHOICE ? (
            <RadioGroup
              value={selectedAnswers[0] || ''}
              onValueChange={value => {
                onAnswerChange(value, true)
              }}
              className="space-y-2"
            >
              {question.answers.map(answer => (
                <div key={answer.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={answer.id} id={`${question.id}-${answer.id}`} />
                  <Label htmlFor={`${question.id}-${answer.id}`} className="cursor-pointer">
                    {answer.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-2">
              {question.answers.map(answer => (
                <div key={answer.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${question.id}-${answer.id}`}
                    checked={selectedAnswers.includes(answer.id)}
                    onCheckedChange={checked => {
                      onAnswerChange(answer.id, !!checked)
                    }}
                  />
                  <Label htmlFor={`${question.id}-${answer.id}`} className="cursor-pointer">
                    {answer.text}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
