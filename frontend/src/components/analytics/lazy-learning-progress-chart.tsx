'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface LearningProgressData {
 date: string;
 completed: number;
  started: number;
  averageScore: number;
}

const LazyLearningProgressChart = dynamic(
  () => import('./learning-progress-chart').then((mod) => ({ default: mod.LearningProgressChart })),
  {
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle>Прогресс обучения</CardTitle>
          <CardDescription>Статистика по завершенным и начатым урокам</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-80" />
        </CardContent>
      </Card>
    ),
    ssr: false
  }
);

export default LazyLearningProgressChart;