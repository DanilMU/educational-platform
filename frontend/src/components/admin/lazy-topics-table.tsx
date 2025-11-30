'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazyTopicsTable = dynamic(
  () => import('./topics-table').then((mod) => ({ default: mod.TopicsTable })),
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

export default LazyTopicsTable;