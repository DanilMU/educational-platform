'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazyCoursesTable = dynamic(
  () => import('./courses-table').then((mod) => ({ default: mod.CoursesTable })),
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

export default LazyCoursesTable;