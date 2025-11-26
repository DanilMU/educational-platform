'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { BookOpen, GraduationCap, FileText, TestTube } from 'lucide-react'
import { AnalyticsDto } from '@/src/api/types/analyticsDto'

interface LearningStatisticsCardProps {
  analytics: AnalyticsDto
}

export function LearningStatisticsCard({ analytics }: LearningStatisticsCardProps) {
  // Временные значения на основе аналитики
  // В будущем эти данные должны приходить напрямую из API
  const subjectsCompleted = 1; // Условно считаем, что 1 предмет пройден
  const topicsCompleted = 3; // Условное количество пройденных тем
  const lessonsCompleted = analytics.lessonsCompleted;
  // Количество пройденных тестов может быть вычислено на основе данных о прогрессе
  const testsPassed = Math.round((analytics.quizSuccessRate * analytics.lessonsCompleted) / 10);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Статистика обучения</CardTitle>
        <GraduationCap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-blue-800 mr-2" />
            <div>
              <div className="text-lg font-bold">{subjectsCompleted}</div>
              <div className="text-xs text-muted-foreground">Предметов</div>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-green-600 mr-2" />
            <div>
              <div className="text-lg font-bold">{topicsCompleted}</div>
              <div className="text-xs text-muted-foreground">Тем</div>
            </div>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-purple-600 mr-2" />
            <div>
              <div className="text-lg font-bold">{lessonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Уроков</div>
            </div>
          </div>
          <div className="flex items-center">
            <TestTube className="h-4 w-4 text-orange-600 mr-2" />
            <div>
              <div className="text-lg font-bold">{testsPassed}</div>
              <div className="text-xs text-muted-foreground">Тестов</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}