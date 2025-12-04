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
import { useGetAnalyticsQuery, useGetUserProgressQuery, useGetUserProgressOverTimeQuery, useGetSubjectsQuery } from '@/src/api/hooks'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks/useGetEnrolledSubjectsQuery'

import { useAuth } from '@/src/hooks/useAuth';
import { useGetMeQuery } from '@/src/api/hooks';

export default function DashboardPage() {
  const { isAuthorized } = useAuth();
  const { data: user } = useGetMeQuery();
  const { data: analytics, isLoading: isAnalyticsLoading, isError: isAnalyticsError } = useGetAnalyticsQuery();
  const { data: enrolledSubjects, isLoading: isSubjectsLoading, isError: isSubjectsError } = useGetEnrolledSubjectsQuery(user?.id || '');
  const { data: progressData, isLoading: isProgressLoading, isError: isProgressError } = useGetUserProgressQuery();
  const { data: userProgressOverTime, isLoading: isProgressOverTimeLoading, isError: isProgressOverTimeError } = useGetUserProgressOverTimeQuery();

  if (isAnalyticsLoading || isSubjectsLoading || isProgressLoading || isProgressOverTimeLoading) {
    return <div>Загрузка...</div>;
  }

  if (isAnalyticsError || !analytics || isSubjectsError || isProgressError || !progressData) {
    return (
      <div className="text-red-50 p-4">
        <h3 className="font-bold mb-2">Ошибка при загрузке данных</h3>
        <p>Analytics error: {isAnalyticsError ? 'Да' : 'Нет'}</p>
        <p>Analytics data: {analytics ? 'Есть' : 'Нет'}</p>
        <p>Progress error: {isProgressError ? 'Да' : 'Нет'}</p>
        <p>Progress data: {progressData ? 'Есть' : 'Нет'}</p>
        <p>Enrolled subjects: {enrolledSubjects ? 'Есть' : 'Нет'}</p>
        <p>Enrolled subjects length: {enrolledSubjects?.length || 0}</p>
        <p>Progress Over Time error: {isProgressOverTimeError ? 'Да' : 'Нет'}</p>
        <p>Progress Over Time data: {userProgressOverTime ? 'Есть' : 'Нет'}</p>
      </div>
    );
  }

  // Определяем текущий курс (первый курс из списка записанных)
  const currentCourse = enrolledSubjects && enrolledSubjects.length > 0
    ? enrolledSubjects[0] // Используем первый курс как текущий
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
         className={currentCourse ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}
       >
         <LearningStatsCard
           title="Пройдено уроков"
           value={analytics.lessonsCompleted}
           total={analytics.totalLessons}
           icon={BookOpen}
         />
         <TimeSpentCard timeSpent={analytics?.totalTimeSpent} />
         <LearningStatisticsCard analytics={analytics} progress={progressData || []} enrolledSubjects={enrolledSubjects || []} />
         {currentCourse && <CurrentCourseCard currentCourse={{ id: currentCourse.id!, title: currentCourse.title || "" }} />}
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
                    {userProgressOverTime ? (
                        <ProgressChart data={userProgressOverTime?.monthlyProgress || []} />
                    ) : (
                        <div className="text-center text-gray-500 py-8">Данные о прогрессе во времени недоступны</div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </div>

             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
             >
               <ActiveCoursesSection enrolledSubjects={enrolledSubjects} progressData={progressData} />
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
