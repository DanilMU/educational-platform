'use client'

// Assuming a type for the subject
type Subject = {
  title: string
  description: string
  author: string
  rating: number
  reviews: number
}

interface SubjectDetailsHeaderProps {
  subject: Subject
}

export function SubjectDetailsHeader({ subject }: SubjectDetailsHeaderProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
      <h1 className="mb-2 text-4xl font-bold">{subject.title}</h1>
      <p className="mb-4 max-w-3xl text-lg text-blue-100">
        {subject.description}
      </p>
      <div className="flex items-center gap-4">
        <span>Автор: {subject.author}</span>
        <span>
          Рейтинг: {subject.rating} ({subject.reviews} отзывов)
        </span>
      </div>
    </div>
  )
}