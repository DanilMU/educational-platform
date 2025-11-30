'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Target
} from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center gap-1 mt-2 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs">{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface AdminStatsCardsProps {
  totalUsers?: number;
  activeCourses?: number;
  averageProgress?: number;
  totalTimeSpent?: number;
}

export function StatsCards({
  totalUsers = 0,
  activeCourses = 0,
  averageProgress = 0,
  totalTimeSpent = 0,
}: AdminStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Всего пользователей"
        value={totalUsers.toLocaleString()}
        description="+12% за последний месяц" // Placeholder
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 12, isPositive: true }} // Placeholder
      />
      <StatsCard
        title="Активные курсы"
        value={activeCourses}
        description="+3 новых курса" // Placeholder
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 15, isPositive: true }} // Placeholder
      />
      <StatsCard
        title="Средний прогресс"
        value={`${averageProgress}%`}
        description="+5% за неделю" // Placeholder
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 5, isPositive: true }} // Placeholder
      />
      <StatsCard
        title="Время обучения"
        value={`${(totalTimeSpent / 60).toFixed(1)}ч`} // Convert minutes to hours
        description="Среднее в день" // Placeholder
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}
