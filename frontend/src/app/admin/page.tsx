'use client'

import { StatsCards } from '@/src/components/admin/stats-cards'
import { LearningProgressChart } from '@/src/components/analytics/learning-progress-chart'
import { PopularCoursesChart } from '@/src/components/analytics/popular-courses-chart'
import { UserActivityChart } from '@/src/components/analytics/user-activity-chart'
import { useAdminDashboardData } from '@/src/api/hooks/useAdminDashboardData'
import { useAdminUserAnalytics, useAdminCourseAnalytics } from '@/src/api/hooks/useAdminAnalyticsData'
import { Skeleton } from '@/src/components/ui/skeleton'

export default function AdminDashboard() {
  const { data: dashboardData, isLoading: isLoadingDashboard, isError: isErrorDashboard } = useAdminDashboardData();
  const { data: userAnalyticsData, isLoading: isLoadingUserAnalytics, isError: isErrorUserAnalytics } = useAdminUserAnalytics('some-user-id'); // Placeholder user ID
  const { data: courseAnalyticsData, isLoading: isLoadingCourseAnalytics, isError: isErrorCourseAnalytics } = useAdminCourseAnalytics('some-course-id'); // Placeholder course ID

  if (isLoadingDashboard || isLoadingUserAnalytics || isLoadingCourseAnalytics) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isErrorDashboard || isErrorUserAnalytics || isErrorCourseAnalytics) {
    return (
      <div className="text-center p-6 text-red-600">
        <h1 className="text-3xl font-bold mb-2">Ошибка загрузки данных</h1>
        <p>Не удалось загрузить данные для дашборда.</p>
      </div>
    );
  }

  const learningProgressData = [
    { date: '2024-01-01', completed: 100, started: 200, averageScore: 80 },
    { date: '2024-01-02', completed: 150, started: 250, averageScore: 82 },
    { date: '2024-01-03', completed: 200, started: 300, averageScore: 85 },
  ];

  const userActivityData = [
    { date: '2024-01-01', activeUsers: 500, newUsers: 100, returningUsers: 400 },
    { date: '2024-01-02', activeUsers: 550, newUsers: 120, returningUsers: 430 },
    { date: '2024-01-03', activeUsers: 600, newUsers: 150, returningUsers: 450 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-600">Обзор платформы и статистика</p>
      </div>
      
      <StatsCards
        totalUsers={dashboardData?.totalUsers}
        activeCourses={dashboardData?.totalCourses}
        averageProgress={dashboardData?.completionRate}
        totalTimeSpent={dashboardData?.averageTimeSpent}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <LearningProgressChart data={learningProgressData} />
        <PopularCoursesChart data={dashboardData?.popularCourses || []} />
      </div>
      
      <UserActivityChart data={userActivityData} />
    </div>
  )
}
