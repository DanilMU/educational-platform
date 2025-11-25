'use client'

// Using the actual Subject type from the API
import { Subject } from '@/src/api/types/subject'

interface SubjectDetailsHeaderProps {
  subject: Subject & {
    author: string
    rating: number
    reviews: number
  }
}

export function SubjectDetailsHeader({ subject }: SubjectDetailsHeaderProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
      <h1 className="mb-2 text-4xl font-bold">{subject.title}</h1>
      <p className="mb-4 max-w-3xl text-lg text-blue-100">
        {typeof subject.description === 'string' ? subject.description : 'Описание отсутствует'}
      </p>
      <div className="flex items-center gap-4">
        <span>Автор: {subject['author'] || 'Не указан'}</span>
        <span>
          Рейтинг: {subject['rating'] || 0} ({subject['reviews'] || 0} отзывов)
        </span>
      </div>
    </div>
  )
}