'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { WelcomeSection } from '@/src/components/dashboard/welcome'
import { LearningStatsCard } from '@/src/components/dashboard/stats-card'
import { TimeSpentCard } from '@/src/components/dashboard/time-spent-card'
import { LearningStatisticsCard } from '@/src/components/dashboard/learning-statistics-card'
import { CurrentCourseCard } from '@/src/components/dashboard/current-course-card'
import { ActiveCoursesSection } from '@/src/components/dashboard/active-courses'
import { RecommendationsSection } from '@/src/components/dashboard/recommendations'
import { ProgressChart } from '@/src/components/dashboard/progress-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { useGetAnalyticsQuery, useGetUserProgressQuery } from '@/src/api/hooks'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks/useGetEnrolledSubjectsQuery'

export default function DashboardPage() {
  const { data: analytics, isLoading: isAnalyticsLoading, isError: isAnalyticsError } = useGetAnalyticsQuery();
  const { data: enrolledSubjects, isLoading: isSubjectsLoading, isError: isSubjectsError } = useGetEnrolledSubjectsQuery();
  const { data: progressData, isLoading: isProgressLoading, isError: isProgressError } = useGetUserProgressQuery();

  if (isAnalyticsLoading || isSubjectsLoading || isProgressLoading) {
    return <div>Загрузка...</div>;
  }

  if (isAnalyticsError || !analytics || isSubjectsError || !enrolledSubjects || isProgressError || !progressData) {
    return (
      <div className="text-red-500 p-4">
        <h3 className="font-bold mb-2">Ошибка при загрузке данных</h3>
        <p>Analytics error: {isAnalyticsError ? 'Да' : 'Нет'}</p>
        <p>Analytics data: {analytics ? 'Есть' : 'Нет'}</p>
		<p>Progress error: {isProgressError ? 'Да' : 'Нет'}</p>
        <p>Progress data: {progressData ? 'Есть' : 'Нет'}</p>
        <p>Enrolled subjects: {enrolledSubjects ? 'Есть' : 'Нет'}</p>
        <p>Enrolled subjects length: {enrolledSubjects?.length || 0}</p>
      </div>
    );
  }

  // Определяем текущий курс (первый незавершенный курс или курс с наименьшим прогрессом)
  const currentCourse = enrolledSubjects.length > 0
    ? enrolledSubjects.find(subject => subject.progress < 100) || enrolledSubjects[0]
    : null;

 return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <LearningStatsCard
          title="Пройдено уроков"
          value={analytics.lessonsCompleted}
          total={analytics.totalLessons}
          icon={BookOpen}
        />
        <TimeSpentCard timeSpent={analytics.totalTimeSpent} />
        <LearningStatisticsCard analytics={analytics} progress={progressData} enrolledSubjects={enrolledSubjects} />
        <CurrentCourseCard currentCourse={currentCourse ? { id: currentCourse.id, title: currentCourse.name } : undefined} />
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Прогресс за последние месяцы</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProgressChart data={[
                        { name: 'Янв', progress: 30 },
                        { name: 'Фев', progress: 45 },
                        { name: 'Мар', progress: 60 },
                        { name: 'Апр', progress: 75 },
                    ]} />
                </CardContent>
            </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ActiveCoursesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <RecommendationsSection />
      </motion.div>
    </div>
  )
}
