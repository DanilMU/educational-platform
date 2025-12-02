'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, Circle, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { useGetUserProgressQuery } from '@/src/api/hooks'

interface Lesson {
  id: string
  title: string
  order?: number
}

interface Topic {
  id: string
  title: string
  lessons: Lesson[]
}

interface CourseNavigationProps {
  topics: Topic[]
  currentLessonId: string
  subjectId: string
  subjectTitle?: string
}

export function CourseNavigation({ topics, currentLessonId, subjectId, subjectTitle }: CourseNavigationProps) {
	const { data: progressData } = useGetUserProgressQuery()
	
	// Используем функцию для инициализации состояния, чтобы определить начальные раскрытые темы
	const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(() => {
	// Находим текущую тему и возвращаем объект с ней как раскрытой
		const currentTopic = topics.find(topic =>
			topic.lessons.some(lesson => lesson.id === currentLessonId)
		);
		
		if (currentTopic) {
			return { [currentTopic.id]: true };
		}
		return {};
	});
	
	// Определяем завершенные уроки
	const completedLessons = new Set(
		progressData?.filter(p => p.isCompleted).map(p => p.lessonId) || []
	)
	
	// Определяем завершенные темы (если все уроки в теме завершены)
	const completedTopics = topics.map(topic => {
		const allLessonsCompleted = topic.lessons.every(lesson => completedLessons.has(lesson.id))
		return { id: topic.id, completed: allLessonsCompleted }
	})
	
	const toggleTopic = (topicId: string) => {
		setExpandedTopics(prev => ({
			...prev,
			[topicId]: !prev[topicId]
		}))
	}
	
	// Находим текущую тему и урок для отображения
	const currentTopic = topics.find(topic =>
		topic.lessons.some(lesson => lesson.id === currentLessonId)
	)
	const currentLesson = currentTopic?.lessons.find(lesson => lesson.id === currentLessonId)
  
  return (
    <div className="w-80 min-h-screen border-r bg-muted/20 p-4">
      <div className="mb-6">
      	{subjectTitle && (
      		<h1 className="text-lg font-semibold mb-2 truncate">{subjectTitle}</h1>
      	)}
      	<h2 className="text-base font-medium mb-2">Прогресс курса</h2>
      	<div className="flex items-center gap-2 text-sm text-muted-foreground">
      		<BookOpen className="w-4 h-4" />
      		<span>
      			{topics.reduce((acc, topic) => acc + topic.lessons.length, 0)} уроков
      		</span>
      	</div>
      </div>
      
      <div className="space-y-4">
        {topics.map((topic, topicIndex) => {
          const isTopicCompleted = completedTopics.some(t => t.id === topic.id && t.completed)
          const isExpanded = expandedTopics[topic.id] ?? false
          
          return (
            <div key={topic.id} className="border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                className="w-full justify-between p-3 hover:bg-accent"
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-center gap-2">
                  {isTopicCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-50" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium truncate">
                    {topicIndex + 1}. {topic.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 space-y-1">
                      {topic.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = completedLessons.has(lesson.id)
                        const isCurrent = lesson.id === currentLessonId
                        
                        return (
                          <Link
                            key={lesson.id}
                            href={`/lessons/${lesson.id}`}
                            className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                              isCurrent
                                ? 'bg-primary text-primary-foreground'
                                : isCompleted
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-muted-foreground hover:bg-accent'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <Circle className="w-3 h-3 flex-shrink-0" />
                            )}
                            <span className="truncate">
                              {lessonIndex + 1}. {lesson.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
 )
}