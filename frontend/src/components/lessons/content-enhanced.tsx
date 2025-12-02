'use client'

import { useState } from 'react'
import { BookOpen, Clock, Award, Users, FileText, Video, FileImage, File, Download } from 'lucide-react'
import { Badge } from '@/src/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Progress } from '@/src/components/ui/progress'
import { Button } from '@/src/components/ui/button'
import { motion } from 'framer-motion'

interface Lesson {
  id: string
  title: string
  content: string
  difficulty?: number
  estimatedTime?: number
 learningObjectives?: string
  attachments?: string[]
  videoUrl?: string
}

interface LessonContentEnhancedProps {
  lesson: Lesson
}

export function LessonContentEnhanced({ lesson }: LessonContentEnhancedProps) {
  const [isReadingMode, setIsReadingMode] = useState(false)
  
  // Определяем типы вложений
  const getAttachmentType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || '')) return 'image'
    if (['mp4', 'avi', 'mov', 'wmv'].includes(ext || '')) return 'video'
    if (['pdf'].includes(ext || '')) return 'pdf'
    if (['doc', 'docx'].includes(ext || '')) return 'doc'
    return 'file'
  }

  // Форматируем время
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} мин`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours} ч ${mins} мин` : `${hours} ч`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Урок</span>
            </div>
            
            {lesson.difficulty && (
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Сложность: {lesson.difficulty}/5</span>
              </div>
            )}
            
            {lesson.estimatedTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Время: {formatTime(lesson.estimatedTime)}</span>
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl mt-2">{lesson.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {lesson.learningObjectives && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Цели урока
              </h3>
              <p className="text-blue-700">{lesson.learningObjectives}</p>
            </div>
          )}
          
          {lesson.videoUrl && (
            <div className="mb-6 rounded-lg overflow-hidden border">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Video className="w-12 h-12 text-gray-400" />
                <p className="ml-2 text-gray-500">Видео: {lesson.videoUrl}</p>
              </div>
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div 
              className={`whitespace-pre-line ${isReadingMode ? 'text-lg leading-relaxed' : ''}`}
              dangerouslySetInnerHTML={{ __html: lesson.content }} 
            />
          </div>
          
          {lesson.attachments && lesson.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Вложения
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.attachments.map((attachment, index) => {
                  const type = getAttachmentType(attachment)
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      {type === 'image' && <FileImage className="w-6 h-6 text-blue-500" />}
                      {type === 'video' && <Video className="w-6 h-6 text-red-500" />}
                      {type === 'pdf' && <FileText className="w-6 h-6 text-red-600" />}
                      {type === 'doc' && <FileText className="w-6 h-6 text-blue-600" />}
                      {type === 'file' && <File className="w-6 h-6 text-gray-500" />}
                      
                      <span className="truncate text-sm">{attachment}</span>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Скачать
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex gap-3">
            <Button onClick={() => setIsReadingMode(!isReadingMode)}>
              {isReadingMode ? 'Обычный режим' : 'Режим чтения'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isReadingMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6"
        >
          <Button size="icon" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="sr-only">Наверх</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </motion.div>
      )}
    </div>
  )
}