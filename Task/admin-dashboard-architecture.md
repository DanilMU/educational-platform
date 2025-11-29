# Архитектура админки и визуализация данных

## 🏗️ Структура админки

### Основные модули админки

#### 1. Дашборд (Dashboard)
**URL**: `/admin`
**Компоненты**:
- Статистика в реальном времени
- Графики активности пользователей
- Популярные курсы
- Системные уведомления

#### 2. Управление пользователями (Users)
**URL**: `/admin/users`
**Компоненты**:
- Список пользователей
- Фильтры и поиск
- Управление ролями
- Просмотр прогресса

#### 3. Управление курсами (Courses)
**URL**: `/admin/courses`
**Компоненты**:
- CRUD операции для курсов
- Управление темами и уроками
- Загрузка контента
- Предпросмотр

#### 4. Аналитика (Analytics)
**URL**: `/admin/analytics`
**Компоненты**:
- Графики прогресса
- Статистика обучения
- Отчеты об использовании
- Экспорт данных

#### 5. Система уведомлений (Notifications)
**URL**: `/admin/notifications`
**Компоненты**:
- Создание уведомлений
- История отправленных
- Шаблоны

## 📊 Визуализация данных

### Графики и диаграммы

#### 1. Прогресс обучения
```typescript
// frontend/src/components/analytics/learning-progress-chart.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'

interface LearningProgressData {
  date: string
  completed: number
  started: number
  averageScore: number
}

export function LearningProgressChart({ data }: { data: LearningProgressData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Прогресс обучения</CardTitle>
        <CardDescription>Статистика по завершенным и начатым урокам</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="started" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
```

#### 2. Популярные курсы
```typescript
// frontend/src/components/analytics/popular-courses-chart.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'

interface PopularCoursesData {
  name: string
  enrollments: number
  completions: number
  rating: number
}

export function PopularCoursesChart({ data }: { data: PopularCoursesData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные курсы</CardTitle>
        <CardDescription>Регистрации и завершения по курсам</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="enrollments" fill="#3b82f6" />
            <Bar dataKey="completions" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
```

#### 3. Активность пользователей
```typescript
// frontend/src/components/analytics/user-activity-chart.tsx
'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'

interface UserActivityData {
  date: string
  activeUsers: number
  newUsers: number
  returningUsers: number
}

export function UserActivityChart({ data }: { data: UserActivityData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Активность пользователей</CardTitle>
        <CardDescription>Дневная активность за последние 30 дней</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="returningUsers" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
```

## 🎨 Компоненты админки

### 1. Навигация админки
```typescript
// frontend/src/components/admin/admin-sidebar.tsx
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
  ChevronDown,
  ChevronRight
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
```

### 2. Шапка админки
```typescript
// frontend/src/components/admin/admin-header.tsx
'use client'

import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск..."
            className="w-64 pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Администратор</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Выход</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

### 3. Карточки статистики
```typescript
// frontend/src/components/admin/stats-cards.tsx
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Award,
  Target
} from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center gap-1 mt-2 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs">{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Всего пользователей"
        value="12,361"
        description="+12% за последний месяц"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Активные курсы"
        value="24"
        description="+3 новых курса"
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 15, isPositive: true }}
      />
      <StatsCard
        title="Средний прогресс"
        value="68%"
        description="+5% за неделю"
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title="Время обучения"
        value="2.5ч"
        description="Среднее в день"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}
```

## 📈 API эндпоинты для админки

### 1. Статистика дашборда
```typescript
// backend/src/api/admin/dashboard.controller.ts
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('Admin')
@Controller('admin/dashboard')
export class DashboardController {
  @Get()
  @ApiOkResponse({ description: 'Данные дашборда' })
  async getDashboardData() {
    return {
      totalUsers: 12361,
      activeUsers: 3421,
      totalCourses: 24,
      totalLessons: 156,
      completionRate: 68,
      averageTimeSpent: 150,
      popularCourses: [
        { id: '1', title: 'Безопасность труда', enrollments: 2341, completions: 1892 },
        { id: '2', title: 'Программирование', enrollments: 1892, completions: 1234 },
        { id: '3', title: 'Менеджмент', enrollments: 1567, completions: 987 },
      ],
      recentActivity: [
        { userId: '1', action: 'completed_lesson', timestamp: new Date() },
        { userId: '2', action: 'started_course', timestamp: new Date() },
        { userId: '3', action: 'passed_quiz', timestamp: new Date() },
      ]
    }
  }
}
```

### 2. Аналитика пользователей
```typescript
// backend/src/api/admin/analytics.controller.ts
import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger'

@ApiTags('Admin')
@Controller('admin/analytics')
export class AnalyticsController {
  @Get('users')
  @ApiQuery({ name: 'period', required: false, enum: ['day', 'week', 'month', 'year'] })
  @ApiOkResponse({ description: 'Аналитика пользователей' })
  async getUserAnalytics(@Query('period') period: string = 'month') {
    return {
      period,
      userGrowth: [
        { date: '2024-01-01', users: 1000 },
        { date: '2024-01-02', users: 1200 },
        { date: '2024-01-03', users: 1350 },
      ],
      activityMetrics: {
        dailyActive: 3421,
        weeklyActive: 8921,
        monthlyActive: 12361,
      },
      demographics: {
        ageGroups: {
          '18-25': 25,
          '26-35': 40,
          '36-45': 20,
          '46+': 15,
        },
        locations: [
          { city: 'Москва', count: 2341 },
          { city: 'Санкт-Петербург', count: 1892 },
          { city: 'Новосибирск', count: 987 },
        ],
      },
    }
  }

  @Get('courses')
  @ApiOkResponse({ description: 'Аналитика курсов' })
  async getCourseAnalytics() {
    return {
      coursePerformance: [
        { 
          id: '1', 
          title: 'Безопасность труда', 
          enrollments: 2341, 
          completions: 1892, 
          averageScore: 85,
          rating: 4.5,
          duration: '2 часа'
        },
        { 
          id: '2', 
          title: 'Программирование', 
          enrollments: 1892, 
          completions: 1234, 
          averageScore: 78,
          rating: 4.2,
          duration: '4 часа'
        },
      ],
      learningProgress: [
        { date: '2024-01-01', completed: 100, started: 200 },
        { date: '2024-01-02', completed: 150, started: 250 },
        { date: '2024-01-03', completed: 200, started: 300 },
      ],
    }
  }
}
```

## 🔧 Интеграция с существующим бэкендом

### 1. Обновление существующих контроллеров
```typescript
// backend/src/api/users/users.controller.ts (дополнение)
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('stats')
@ApiOperation({ summary: 'Получить статистику пользователей (только для админов)' })
@ApiOkResponse({ description: 'Статистика пользователей.' })
public async getUserStats() {
  return this.usersService.getUserStats();
}

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('export')
@ApiOperation({ summary: 'Экспорт данных пользователей (только для админов)' })
@ApiOkResponse({ description: 'Файл с данными пользователей.' })
public async exportUsers() {
  return this.usersService.exportUsers();
}
```

### 2. Создание новых сервисов
```typescript
// backend/src/api/admin/admin.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData() {
    const [totalUsers, activeUsers, totalCourses, totalLessons] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.userProgress.count({
        where: { isCompleted: true }
      }),
      this.prisma.subject.count(),
      this.prisma.lesson.count(),
    ])

    return {
      totalUsers,
      activeUsers,
      totalCourses,
      totalLessons,
    }
  }

  async getUserAnalytics(period: string) {
    // Логика получения аналитики пользователей
    return {}
  }

  async getCourseAnalytics() {
    // Логика получения аналитики курсов
    return {}
  }
}
```

## 🎯 Следующие шаги

1. **Создание базовой структуры админки**
   - Настройка роутов
   - Создание layout компонентов
   - Интеграция с существующим бэкендом

2. **Реализация дашборда**
   - Карточки статистики
   - Графики активности
   - Система уведомлений

3. **Управление пользователями**
   - Таблица пользователей
   - Фильтры и поиск
   - Управление ролями

4. **Управление курсами**
   - CRUD операции
   - Загрузка контента
   - Предпросмотр

5. **Аналитика и отчеты**
   - Графики прогресса
   - Экспорт данных
   - Настраиваемые отчеты

---

**Архитектура админки готова к реализации!** 🚀