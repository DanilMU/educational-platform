'use client'

import dynamic from 'next/dynamic'

// Ленивая загрузка тяжелой таблицы курсов
const LazyCoursesTable = dynamic(() => import('@/src/components/admin/lazy-courses-table'), { ssr: false });

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Курсы</h1>
        <p className="text-gray-600">Управление курсами и уроками</p>
      </div>
      
      <LazyCoursesTable />
    </div>
  )
}
