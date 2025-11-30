'use client'

import dynamic from 'next/dynamic'

// Ленивая загрузка тяжелой таблицы пользователей
const LazyUsersTable = dynamic(() => import('@/src/components/admin/lazy-users-table'), { ssr: false });

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Пользователи</h1>
        <p className="text-gray-600">Управление пользователями и их ролями</p>
      </div>
      
      <LazyUsersTable />
    </div>
  )
}
