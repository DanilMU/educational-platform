'use client'

import dynamic from 'next/dynamic'

// Ленивая загрузка тяжелой таблицы уроков
const LazyLessonsTable = dynamic(() => import('@/src/components/admin/lazy-lessons-table'), { ssr: false });

export default function AdminLessonsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Уроки</h1>
        <p className="text-gray-600">Управление уроками курсов</p>
      </div>
      
      <LazyLessonsTable />
    </div>
  );
}
