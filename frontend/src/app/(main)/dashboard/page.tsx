'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { WelcomeSection } from '@/src/components/dashboard/welcome'
import { LearningStatsCard } from '@/src/components/dashboard/stats-card'
import { TimeSpentCard } from '@/src/components/dashboard/time-spent-card'
import { AchievementsCard } from '@/src/components/dashboard/achievements-card'
import { CurrentCourseCard } from '@/src/components/dashboard/current-course-card'
import { ActiveCoursesSection } from '@/src/components/dashboard/active-courses'
import { RecommendationsSection } from '@/src/components/dashboard/recommendations'
import { ProgressChart } from '@/src/components/dashboard/progress-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'

// Mock Data
const stats = {
    completedLessons: 18,
    totalLessons: 50,
    timeSpent: 250, // in minutes
    achievements: 5,
    currentCourse: {
        id: '1',
        title: 'Безопасность труда',
    },
    progressData: [
        { name: 'Янв', progress: 30 },
        { name: 'Фев', progress: 45 },
        { name: 'Мар', progress: 60 },
        { name: 'Апр', progress: 75 },
    ]
}

export default function DashboardPage() {
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
          value={stats.completedLessons}
          total={stats.totalLessons}
          icon={BookOpen}
        />
        <TimeSpentCard timeSpent={stats.timeSpent} />
        <AchievementsCard achievements={stats.achievements} />
        <CurrentCourseCard currentCourse={stats.currentCourse} />
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
                    <ProgressChart data={stats.progressData} />
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
