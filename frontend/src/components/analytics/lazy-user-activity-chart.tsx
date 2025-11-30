'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface UserActivityData {
  date: string;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
}

const LazyUserActivityChart = dynamic(
  () => import('./user-activity-chart').then((mod) => ({ default: mod.UserActivityChart })),
  {
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle>Активность пользователей</CardTitle>
          <CardDescription>Дневная активность за последние 30 дней</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-80" />
        </CardContent>
      </Card>
    ),
    ssr: false
 }
);

export default LazyUserActivityChart;