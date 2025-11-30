'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface PopularCoursesData {
  title: string;
  enrollments: number;
  completions: number;
}

const LazyPopularCoursesChart = dynamic(
  () => import('./popular-courses-chart').then((mod) => ({ default: mod.PopularCoursesChart })),
  {
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle>Популярные курсы</CardTitle>
          <CardDescription>Регистрации и завершения по курсам</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-80" />
        </CardContent>
      </Card>
    ),
    ssr: false
 }
);

export default LazyPopularCoursesChart;