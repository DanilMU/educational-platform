'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, Circle, ChevronRight, ChevronDown, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Progress } from '@/src/components/ui/progress'
import { useGetUserProgressQuery } from '@/src/api/hooks'

interface Lesson {
  id: string
  title: string
}

interface Topic {
  id: string
  title: string
  lessons: Lesson[]
}

interface SubjectProgressProps {
  topics: Topic[]
  subjectId: string
  subjectTitle: string
}

export function SubjectProgress({ topics, subjectId, subjectTitle }: SubjectProgressProps) {
  const { data: progressData } = useGetUserProgressQuery()
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({})
  
  // Определяем завершенные уроки
  const completedLessons = new Set(
    progressData?.filter(p => p.isCompleted).map(p => p.lessonId) || []
 )
  
  // Вычисляем прогресс по курсу
  const totalLessons = topics.reduce((acc, topic) => acc + topic.lessons.length, 0)
  const completedLessonsCount = Array.from(completedLessons).filter(lessonId => 
    topics.some(topic => topic.lessons.some(lesson => lesson.id === lessonId))
  ).length
  
  const progressPercentage = totalLessons > 0 
    ? Math.round((completedLessonsCount / totalLessons) * 100) 
    : 0
  
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
  
 return (
 	<>
 		<div className="w-80 min-h-screen border-r bg-muted/20 p-4">
 			<div className="mb-6">
 				<h1 className="text-lg font-semibold mb-2 truncate">{subjectTitle}</h1>
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
 												
 												return (
 													<Link
 														key={lesson.id}
 														href={`/lessons/${lesson.id}`}
 														className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
 															isCompleted
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
 					<Link href={`/my-courses`}>
 						<ChevronRight className="w-4 h-4 mr-2" />
 						Мои курсы
 					</Link>
 				</Button>
 			</div>
 		</div>
 	</>
 )
}