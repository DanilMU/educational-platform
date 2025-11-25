'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'

// Mock data structure
const recommendations = [
    {
        id: '3',
        title: 'Менеджмент',
        description: 'Развивайте навыки управления проектами и командами',
        category: 'Бизнес',
        lessons: '8',
        progress: 0,
    }
]

export function RecommendationsSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Рекомендации для вас</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map(course => (
                    <SubjectCard key={course.id} subject={course} />
                ))}
            </div>
        </div>
    )
}