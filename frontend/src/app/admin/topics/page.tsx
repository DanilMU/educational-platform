'use client'

import dynamic from 'next/dynamic'

// Ленивая загрузка тяжелой таблицы тем
const LazyTopicsTable = dynamic(() => import('@/src/components/admin/lazy-topics-table'), { ssr: false });

export default function AdminTopicsPage() {
 return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Темы</h1>
        <p className="text-gray-600">Управление темами курсов</p>
      </div>
      
      <LazyTopicsTable />
    </div>
  );
}
