'use client'

import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  FileText
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Дашборд',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Пользователи',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Курсы',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Уроки',
    href: '/admin/lessons',
    icon: FileText,
  },
  {
    title: 'Аналитика',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Уведомления',
    href: '/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center border-b border-gray-700 px-6">
        <h1 className="text-xl font-bold">Админка</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
