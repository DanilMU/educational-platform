'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazyLessonForm = dynamic(
  () => import('./lesson-form').then((mod) => ({ default: mod.LessonForm })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    ),
    ssr: false
 }
);

export default LazyLessonForm;