'use client'

import { useAuth } from '@/src/hooks/useAuth'
import { useGetEnrolledSubjectsQuery, useGetSubjectsQuery } from '@/src/api/hooks'
import { BookOpen, Clock, CheckCircle, Users, Star } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { EnrolledSubjectCard } from './enrolled-subject-card'
import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'

export function MyCoursesEnhanced() {
  const { user } = useAuth()
  const { data: enrolledSubjects = [], isLoading: enrolledLoading, isError: enrolledError } = useGetEnrolledSubjectsQuery(user?.id || '')
  const { data: allSubjectsData, isLoading: allLoading, isError: allError } = useGetSubjectsQuery()
  const [activeTab, setActiveTab] = useState('enrolled')

  const allSubjects = allSubjectsData?.data || []

  // Определяем, какие курсы уже записаны (для отображения статуса)
  const enrolledSubjectIds = new Set(enrolledSubjects.map(subject => subject.id))

  // Функция для вычисления прогресса по курсу не используется в этом компоненте
  // Она будет реализована в соответствующем компоненте отображения курса

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Мои курсы и каталог</h1>
        <Button asChild>
          <Link href='/subjects'>Изучать новые курсы</Link>
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled">Мои курсы ({enrolledSubjects.length})</TabsTrigger>
          <TabsTrigger value="all">Каталог курсов ({allSubjects.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          {enrolledLoading ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="rounded-lg border p-4">
                  <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
                </Card>
              ))}
            </div>
          ) : enrolledError ? (
            <div className='flex justify-center items-center h-64'>
              <p className='text-red-500'>
                Произошла ошибка при загрузке ваших курсов.
              </p>
            </div>
          ) : enrolledSubjects && enrolledSubjects.length > 0 ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {enrolledSubjects.map((subject) => {
              	// Вычисляем прогресс как соотношение тем с завершенными уроками
              	const totalLessons = subject.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0
              	// В реальном приложении здесь будет вычисление на основе данных прогресса пользователя
              	const progress = 0 // Заглушка - в реальном приложении будет вычислено из прогресса пользователя
              	return (
                  <Card key={subject.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{subject.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      	<BookOpen className="w-4 h-4" />
                      	<span>{subject.topics?.length || 0} тем, ~{subject.topics?.length ? subject.topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) : 0} уроков</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Прогресс</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/subjects/${subject.id}`}>Продолжить</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/subjects/${subject.id}`}>Обзор</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className='py-12 text-center'>
              <div className='mx-auto mb-4 size-12 text-gray-300 flex justify-center'>
                <BookOpen className='size-12' />
              </div>
              <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                Вы еще не записаны на курсы
              </h3>
              <p className='mb-6 text-gray-600'>
                Начните свое обучение, выбрав один из доступных курсов.
              </p>
              <Button asChild>
                <Link href='/subjects'>Перейти к каталогу курсов</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-6">
          {allLoading ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : allError ? (
            <div className='flex justify-center items-center h-64'>
              <p className='text-red-500'>
                Произошла ошибка при загрузке курсов.
              </p>
            </div>
          ) : allSubjects && allSubjects.length > 0 ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {allSubjects.map((subject) => {
                // Добавляем информацию о том, записан ли пользователь на курс
                const isEnrolled = enrolledSubjectIds.has(subject.id)
                return (
                  <SubjectCard 
                    key={subject.id} 
                    subject={{ 
                      ...subject, 
                      isEnrolled // Добавляем статус записи к курсу
                    }} 
                  />
                )
              })}
            </div>
          ) : (
            <div className='flex justify-center items-center h-64'>
              <p className='text-gray-500'>
                Курсы не найдены.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}