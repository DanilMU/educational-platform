'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazyLessonsTable = dynamic(
  () => import('./lessons-table').then((mod) => ({ default: mod.LessonsTable })),
  {
    loading: () => (
      <div className="rounded-lg border bg-card p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    ),
    ssr: false
 }
);

export default LazyLessonsTable;