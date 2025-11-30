'use client'

import { useAuth } from '@/src/hooks/useAuth'
import { useGetMeQuery, useGetEnrolledSubjectsQuery, useGetSubjectsQuery } from '@/src/api/hooks'
import { BookOpen } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { EnrolledSubjectCard } from './enrolled-subject-card'
import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export function MySubjectsCombined() {
  const { isAuthorized } = useAuth()
  const { data: user } = useGetMeQuery()
  const { data: enrolledSubjects = [], isLoading: enrolledLoading, isError: enrolledError } = useGetEnrolledSubjectsQuery(user?.id || '')
  const { data: allSubjectsData, isLoading: allLoading, isError: allError } = useGetSubjectsQuery()

  const allSubjects = allSubjectsData?.data || []

  // Определяем, какие курсы уже записаны (для отображения статуса)
  const enrolledSubjectIds = new Set(enrolledSubjects.map(subject => subject.id))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Мои курсы и все курсы</h1>
      
      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled">Мои курсы ({enrolledSubjects.length})</TabsTrigger>
          <TabsTrigger value="all">Все курсы ({allSubjects.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          {enrolledLoading ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
                </div>
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
              {enrolledSubjects.map((subject) => (
                <EnrolledSubjectCard key={subject.id} subject={subject} />
              ))}
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
                <Link href='/subjects'>Перейти к курсам</Link>
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