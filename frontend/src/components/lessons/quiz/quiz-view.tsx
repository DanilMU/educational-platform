'use client'

import { useGetQuizByLessonIdQuery, useSubmitQuizMutation } from '@/src/api/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { useState } from 'react'
import type { UserAnswerDto } from '@/src/api/types'
import { QuestionType } from '@/src/api/types'
import { errorCatch } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'

import { AnimatePresence, motion } from 'framer-motion'
import { Progress } from '@/src/components/ui/progress'
import { QuestionCard } from '@/src/components/quiz/question-card'
import { QuestionNavigation } from '@/src/components/quiz/navigation'
import { QuizHeader } from '@/src/components/quiz/quiz-header'
import { QuizResultDto } from '@/src/api/types/quizResultDto'

interface QuizViewProps {
  lessonId: string
}

export function QuizView({ lessonId }: QuizViewProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: quiz,
    isLoading,
    isError,
    error,
  } = useGetQuizByLessonIdQuery(lessonId, {
    retry: false, // Don't retry on 404
  })

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string[]>
  >({})
  const [quizResult, setQuizResult] = useState<QuizResultDto | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const submitMutation = useSubmitQuizMutation(quiz?.id ?? '', {
    onSuccess: data => {
      setQuizResult(data)
      // Since the backend now updates the progress, we just need to invalidate queries
      // to refetch the user's updated progress information.
      queryClient.invalidateQueries({ queryKey: ['get user progress'] })
      queryClient.invalidateQueries({ queryKey: ['analytics', 'current-user'] })
      queryClient.invalidateQueries({ queryKey: ['get enrolled subjects'] })
    },
    onError: error => {
      console.error('Ошибка при отправке теста:', error)
      alert('Ошибка при отправке теста.')
    },
  })

  const handleTimeUp = () => {
    handleSubmit()
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Skeleton className="mb-8 h-24 w-full" />
        <Skeleton className="mb-8 h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
        <div className="mt-8 flex justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    )
  }

  if (isError) {
    const errorMessage = error ? errorCatch(error as Error) : 'Тест не найден.'
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h3 className="text-xl font-semibold">Тест не найден</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Для урока с ID: {lessonId} тест не был найден.
        </p>
        <div className="mt-4 w-full text-left text-xs text-red-500 bg-red-50 p-3 rounded">
            <p className="font-bold">Техническая информация:</p>
            <pre className="mt-1 whitespace-pre-wrap break-all">{errorMessage}</pre>
        </div>
      </div>
    )
  }
  
  if (!quiz) {
    return null;
  }

  if (quizResult) {
    const userScore = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const isPassed = userScore >= quiz.passingScore;

    return (
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Результаты теста</CardTitle>
          <CardDescription>{quiz.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-2xl font-bold">
            Ваш результат: {quizResult.score} из {quizResult.totalQuestions}
          </p>
          <p className="text-xl font-semibold">
            {quizResult.message}
          </p>
          <div className="flex justify-around text-lg">
            <p className="text-green-600">
              Правильных: {quizResult.correctAnswers}
            </p>
            <p className="text-red-600">
              Неправильных: {quizResult.incorrectAnswers}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 sm:flex-row">
          {isPassed ? (
            <Button onClick={() => router.back()}>Вернуться к уроку</Button>
          ) : (
            <Button
              onClick={() => {
                setQuizResult(null)
                setSelectedAnswers({})
                setCurrentQuestionIndex(0)
              }}
            >
              Попробовать снова
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  const handleAnswerChange = (
    questionId: string,
    answerId: string,
    checked: boolean
  ) => {
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) return

    setSelectedAnswers(prev => {
      if (question.type === QuestionType.SINGLE_CHOICE) {
        return { ...prev, [questionId]: [answerId] }
      } else {
        const existingAnswers = prev[questionId] || []
        if (checked) {
          return { ...prev, [questionId]: [...existingAnswers, answerId] }
        } else {
          return {
            ...prev,
            [questionId]: existingAnswers.filter(id => id !== answerId),
          }
        }
      }
    })
  }

  const handleSubmit = () => {
    const userAnswers: UserAnswerDto[] = Object.entries(selectedAnswers).map(
      ([questionId, answerIds]) => ({
        questionId,
        answerIds,
      })
    )

    if (quiz && userAnswers.length !== quiz.questions.length) {
      alert('Пожалуйста, ответьте на все вопросы.')
      return
    }

    submitMutation.mutate({ answers: userAnswers })
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="mx-auto max-w-4xl p-6">
      <QuizHeader quiz={quiz} onTimeUp={handleTimeUp} />

      <div className="my-8">
        <Progress value={progress} className="h-3" />
        <p className="mt-2 text-sm text-muted-foreground">
          Вопрос {currentQuestionIndex + 1} из {quiz.questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            selectedAnswers={selectedAnswers[currentQuestion.id] || []}
            onAnswerChange={(answerId, checked) =>
              handleAnswerChange(currentQuestion.id, answerId, checked)
            }
          />
        </motion.div>
      </AnimatePresence>
      
      <QuestionNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
        onPrev={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
        onNext={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
