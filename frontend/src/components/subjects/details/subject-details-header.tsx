'use client'

import { Subject } from '@/src/api/types/subject'

interface SubjectDetailsHeaderProps {
  subject: Subject
}

export function SubjectDetailsHeader({ subject }: SubjectDetailsHeaderProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-800 to-purple-600 p-8 text-white">
      <h1 className="mb-2 text-4xl font-bold">{subject.title}</h1>
      <p className="mb-4 max-w-3xl text-lg text-blue-100">
        {subject.description || 'Описание отсутствует'}
      </p>
    </div>
  )
}