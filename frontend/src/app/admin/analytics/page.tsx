'use client'

import { LearningProgressChart } from '@/src/components/analytics/learning-progress-chart'
import { PopularCoursesChart } from '@/src/components/analytics/popular-courses-chart'
import { UserActivityChart } from '@/src/components/analytics/user-activity-chart'

const learningProgressData = [
    { date: '2024-01-01', completed: 100, started: 200, averageScore: 80 },
    { date: '2024-01-02', completed: 150, started: 250, averageScore: 82 },
    { date: '2024-01-03', completed: 200, started: 300, averageScore: 85 },
];

const popularCoursesData = [
    { title: 'Безопасность', enrollments: 1200, completions: 950, rating: 4.5 },
    { title: 'Программирование', enrollments: 800, completions: 600, rating: 4.8 },
    { title: 'Менеджмент', enrollments: 1500, completions: 1100, rating: 4.2 },
];

const userActivityData = [
    { date: '2024-01-01', activeUsers: 500, newUsers: 100, returningUsers: 400 },
    { date: '2024-01-02', activeUsers: 550, newUsers: 120, returningUsers: 430 },
    { date: '2024-01-03', activeUsers: 600, newUsers: 150, returningUsers: 450 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
        <p className="text-gray-600">Детальная статистика платформы</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <UserActivityChart data={userActivityData} />
        <LearningProgressChart data={learningProgressData} />
        <PopularCoursesChart data={popularCoursesData} />
      </div>
    </div>
  )
}
