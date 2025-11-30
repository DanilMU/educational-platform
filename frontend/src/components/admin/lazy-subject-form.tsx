'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazySubjectForm = dynamic(
  () => import('./subject-form').then((mod) => ({ default: mod.SubjectForm })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    ),
    ssr: false
 }
);

export default LazySubjectForm;