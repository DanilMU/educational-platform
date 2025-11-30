'use client'

import { Skeleton } from '@/src/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LazyUserForm = dynamic(
  () => import('./user-form').then((mod) => ({ default: mod.UserForm })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    ),
    ssr: false
 }
);

export default LazyUserForm;