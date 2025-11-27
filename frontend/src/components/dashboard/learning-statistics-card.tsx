'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { BookOpen, GraduationCap, FileText, TestTube } from 'lucide-react'
import { AnalyticsDto, Progress } from '@/src/api/types'
import { EnrolledSubject } from '@/src/api/types/enrolled-subject'

interface LearningStatisticsCardProps {
  analytics: AnalyticsDto
  progress: Progress[]
  enrolledSubjects: EnrolledSubject[]
}

export function LearningStatisticsCard({ analytics, progress, enrolledSubjects }: LearningStatisticsCardProps) {
	const completedLessonIds = new Set(
		progress.filter(p => p.isCompleted).map(p => p.lessonId)
	);

	const subjectsCompleted = enrolledSubjects.filter(s => s.progress === 100).length;

	const topicsCompleted = enrolledSubjects.reduce((acc, subject) => {
			return acc + (subject.topics || []).filter(topic => {
					const lessonIds = topic.lessons?.map(l => l.id) || [];
					return lessonIds.length > 0 && lessonIds.every(id => completedLessonIds.has(id));
			}).length;
	}, 0);
	
  const lessonsCompleted = analytics.lessonsCompleted;
  const testsPassed = progress.filter(p => p.isCompleted && p.score != null).length;

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