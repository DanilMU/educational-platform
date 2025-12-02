'use client'
 
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, Circle, ChevronRight, ChevronDown, Clock, FileQuestion } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Progress } from '@/src/components/ui/progress'
import { useGetUserProgressQuery } from '@/src/api/hooks'

interface Lesson {
  id: string
  title: string
  content: string
  order?: number
  quiz?: {
    id: string
  }
}

interface Topic {
  id: string
  title: string
  lessons: Lesson[]
}

interface TopicViewEnhancedProps {
  topic: Topic
  subjectId: string
  subjectTitle: string
}

export function TopicViewEnhanced({ topic, subjectId, subjectTitle }: TopicViewEnhancedProps) {
  const { data: progressData } = useGetUserProgressQuery()
  
  // Определяем завершенные уроки
  const completedLessons = new Set(
    progressData?.filter(p => p.isCompleted).map(p => p.lessonId) || []
  )
  
  // Вычисляем прогресс по теме
  const totalLessons = topic.lessons.length
  const completedLessonsCount = topic.lessons.filter(lesson => completedLessons.has(lesson.id)).length
  const progressPercentage = totalLessons > 0 
    ? Math.round((completedLessonsCount / totalLessons) * 100) 
    : 0

  return (
    <div className="flex">
      <div className="w-80 min-h-screen border-r bg-muted/20 p-4">
        <div className="mb-6">
          <h1 className="text-lg font-semibold mb-2 truncate">{subjectTitle}</h1>
          <h2 className="text-base font-medium mb-2">{topic.title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <BookOpen className="w-4 h-4" />
            <span>
              {totalLessons} уроков
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс</span>
              <span>{completedLessonsCount}/{totalLessons}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-center text-sm font-medium">
              {progressPercentage}%
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {topic.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id)
            
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isCompleted
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'hover:bg-muted'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{index + 1}. {lesson.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Урок</span>
                    {lesson.quiz && (
                      <>
                        <FileQuestion className="w-3 h-3 ml-1" />
                        <span>Тест</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>
            )
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" asChild className="w-full">
            <Link href={`/subjects/${subjectId}`}>
              <ChevronRight className="w-4 h-4 mr-2" />
              К оглавлению курса
            </Link>
          </Button>
         </div>
         </div>
         
         <div className="flex-1 p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{topic.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{topic.lessons.length} уроков</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>~{topic.lessons.reduce((acc, lesson) => acc + (lesson.content.length / 1000), 0).toFixed(0)} мин</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p>В этом разделе вы изучите основные концепции и принципы, которые помогут вам освоить материал курса.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Уроки в этом разделе:</h3>
              <ul className="space-y-3">
                {topic.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.has(lesson.id)
                  return (
                    <li key={lesson.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-muted-foreground/20'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link 
                          href={`/lessons/${lesson.id}`} 
                          className="font-medium hover:underline"
                        >
                          {lesson.title}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">
                          {lesson.content.substring(0, 100)}...
                          {lesson.quiz && (
                            <span className="ml-2 inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              <FileQuestion className="w-3 h-3" />
                              Тест
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Советы по прохождению раздела:</h4>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  <li>Проходите уроки последовательно для лучшего усвоения материала</li>
                  <li>Не спешите - уделите достаточно времени каждому уроку</li>
                  <li>Проверяйте свои знания с помощью тестов</li>
                  <li>Практикуйтесь - применяйте полученные знания на практике</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}