'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { BookOpen, GraduationCap, FileText, TestTube } from 'lucide-react'
import { AnalyticsDto, Progress, Subject } from '@/src/api/types'

interface LearningStatisticsCardProps {
  analytics: AnalyticsDto
  progress: Progress[]
  enrolledSubjects: Subject[]
}

export function LearningStatisticsCard({ analytics, progress, enrolledSubjects }: LearningStatisticsCardProps) {
	
	// Проверяем, что analytics и необходимые поля существуют
	if (!analytics || !progress || !enrolledSubjects) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Статистика обучения</CardTitle>
					<GraduationCap className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-center py-4 text-muted-foreground">
						Нет данных для отображения
					</div>
				</CardContent>
			</Card>
		);
	}
	const completedLessonIds = new Set(
		progress?.filter(p => p.isCompleted).map(p => p.lessonId) || []
	);

	// Так как у нас теперь просто список предметов (Subject[]), а не с прогрессом,
	// вычисляем статистику на основе прогресса пользователя
	const subjectsCompleted = 0; // Временно, пока нет информации о завершенных курсах

	// Количество тем не может быть вычислено из Subject[], так как в Subject нет информации о темах
	const topicsCompleted = 0; // Временно
	
	 const lessonsCompleted = analytics?.lessonsCompleted || 0;
	 const testsPassed = progress?.filter(p => p.isCompleted && p.score != null).length || 0;

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