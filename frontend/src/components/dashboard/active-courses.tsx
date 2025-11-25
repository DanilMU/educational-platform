'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'

// Mock data structure
const courses = [
    {
        id: '1',
        title: 'Безопасность труда',
        description: 'Изучите основы охраны труда и промышленной безопасности',
        category: 'Охрана труда',
        lessons: '12',
        progress: 75,
    },
    {
        id: '2',
        title: 'Программирование',
        description: 'Современные языки программирования и фреймворки',
        category: 'IT',
        lessons: '25',
        progress: 30,
    }
]

export function ActiveCoursesSection() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Активные курсы</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <SubjectCard key={course.id} subject={course} />
        ))}
      </div>
    </div>
  )
}
