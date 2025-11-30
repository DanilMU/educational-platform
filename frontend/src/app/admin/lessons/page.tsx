'use client'

import { LessonsTable } from '@/src/components/admin/lessons-table';

export default function AdminLessonsPage() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Управление уроками</h2>
      <LessonsTable />
    </div>
  );
}
