import { UsersTable } from '@/src/components/admin/users-table'

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Пользователи</h1>
        <p className="text-gray-600">Управление пользователями и их ролями</p>
      </div>
      
      <UsersTable />
    </div>
  )
}
