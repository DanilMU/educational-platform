# Детальная документация по реализации Frontend для Образовательной Платформы

## Введение

Эта документация содержит пошаговую реализацию всех компонентов образовательной платформы на основе существующего backend API. Каждый раздел включает описание структуры, код реализации и объяснение подходов.

## Принципы реализации

1. **Компонентный подход** - логика выносится в отдельные компоненты
2. **Типизация** - полное использование TypeScript
3. **Оптимизация** - мемоизация, lazy loading, virtualization
4. **Модульность** - четкое разделение ответственности
5. **UX/UI фокус** - интуитивный интерфейс

---

## 1. Главная страница (Landing)

### Структура файлов:
```
src/
├── app/
│   ├── page.tsx                    # Главная страница
│   └── layout.tsx                  # Корневой layout
├── components/
│   ├── layout/
│   │   └── site-header.tsx        # Шапка сайта
│   └── ui/
│       ├── button.tsx             # Кнопки
│       └── input.tsx               # Инпуты
└── lib/
    └── utils.ts                   # Утилиты
```

### Реализация:

#### `src/app/page.tsx`
```typescript
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  ArrowRight,
  PlayCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Онлайн-обучение современным технологиям
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Получите востребованные навыки с нашими курсами программирования, дизайна и数据分析
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/subjects">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Начать обучение
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
                <CardDescription>Курсов</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">10,000+</CardTitle>
                <CardDescription>Студентов</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">95%</CardTitle>
                <CardDescription>Успешность</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">4.8/5</CardTitle>
                <CardDescription>Рейтинг</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Популярные курсы */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Популярные курсы</h2>
            <p className="text-gray-600">Начните с самых востребованных направлений</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-blue-600" />
                </div>
                <CardTitle>Веб-разработка</CardTitle>
                <CardDescription>
                  Полный курс по frontend и backend разработке
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">40 уроков</span>
                  <span className="text-sm font-medium">8 недель</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/subjects/web-development">
                    Подробнее <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-green-600" />
                </div>
                <CardTitle>Data Science</CardTitle>
                <CardDescription>
                  Анализ данных и машинное обучение
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">35 уроков</span>
                  <span className="text-sm font-medium">10 недель</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/subjects/data-science">
                    Подробнее <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-purple-600" />
                </div>
                <CardTitle>UI/UX Дизайн</CardTitle>
                <CardDescription>
                  Создание пользовательских интерфейсов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">30 уроков</span>
                  <span className="text-sm font-medium">6 недель</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/subjects/ui-ux-design">
                    Подробнее <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать обучение?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь тысячам студентов и получите новые навыки
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">
              Начать бесплатно
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
```

#### `src/app/layout.tsx`
```typescript
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { SiteHeader } from '@/src/components/layout/site-header'

const geist = Geist({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Образовательная платформа',
  description: 'Онлайн обучение современным технологиям',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${geist.className} antialiased`}>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

---

## 2. Аутентификация

### Структура файлов:
```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx              # Страница входа
│   │   ├── register/
│   │   │   └── page.tsx              # Страница регистрации
│   │   └── layout.tsx                # Layout для auth
├── components/
│   └── auth/
│       ├── auth-wrapper.tsx          # Обертка для форм
│       ├── login-form.tsx            # Форма входа
│       └── register-form.tsx         # Форма регистрации
├── hooks/
│   └── useAuth.ts                   # Хук для аутентификации
└── lib/
    └── cookies.ts                    # Работа с cookies
```

### Реализация:

#### `src/app/auth/login/page.tsx`
```typescript
import { LoginForm } from '@/src/components/auth/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Авторизация'
}

export default function LoginPage() {
    return <LoginForm />
}
```

#### `src/app/auth/register/page.tsx`
```typescript
import { RegisterForm } from "@/src/components/auth/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Регистрация'
}

export default function RegisterPage() {
    return <RegisterForm />
}
```

#### `src/app/auth/layout.tsx`
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Авторизация',
  description: 'Войдите или зарегистрируйтесь в образовательной платформе',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Добро пожаловать
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Войдите в свой аккаунт или создайте новый
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
```

#### `src/components/auth/auth-wrapper.tsx`
```typescript
'use client'

import { useState } from 'react'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

interface AuthWrapperProps {
  onSuccess?: () => void
}

export function AuthWrapper({ onSuccess }: AuthWrapperProps) {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              !isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Регистрация
          </button>
        </div>
      </div>

      {isLogin ? (
        <LoginForm onSuccess={onSuccess} />
      ) : (
        <RegisterForm onSuccess={onSuccess} />
      )}
    </div>
  )
}
```

#### `src/components/auth/login-form.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useLoginMutation } from '@/src/api/hooks/useLoginMutation'

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null)
  const loginMutation = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      await loginMutation.mutateAsync(data)
      onSuccess?.()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Произошла ошибка при входе')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в систему</CardTitle>
        <CardDescription>
          Введите ваш email и пароль для входа
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || loginMutation.isPending}
          >
            {loginMutation.isPending || isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <a href="/auth/reset-password" className="text-blue-600 hover:underline">
            Забыли пароль?
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### `src/components/auth/register-form.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useRegisterMutation } from '@/src/api/hooks/useRegisterMutation'

const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null)
  const registerMutation = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null)
      // Удаляем confirmPassword из данных отправки
      const { confirmPassword, ...registerData } = data
      await registerMutation.mutateAsync(registerData)
      onSuccess?.()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Произошла ошибка при регистрации')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Создайте аккаунт для начала обучения
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                placeholder="Иван"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                placeholder="Иванов"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || registerMutation.isPending}
          >
            {registerMutation.isPending || isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Регистрация...
              </>
            ) : (
              'Зарегистрироваться'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

#### `src/hooks/useAuth.ts`
```typescript
import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/cookies";

export function useAuth() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = getAccessToken()
        setIsAuthorized(Boolean(token && typeof token !== 'undefined'))
        setIsLoading(false)
    }, [])

    return { isAuthorized, isLoading }
}
```

---

## 3. Каталог курсов

### Структура файлов:
```
src/
├── app/
│   ├── (main)/
│   │   ├── subjects/
│   │   │   ├── page.tsx              # Страница каталога
│   │   │   └── [subjectId]/
│   │   │       ├── page.tsx          # Страница предмета
│   │   │       └── topics/
│   │   │           └── [topicId]/
│   │   │               └── page.tsx  # Страница темы
│   │   └── layout.tsx                # Layout для авторизованных
├── components/
│   ├── course/
│   │   ├── course-card.tsx           # Карточка курса
│   │   ├── subject-list.tsx          # Список предметов
│   │   └── topic-grid.tsx           # Сетка тем
│   └── ui/
│       ├── card.tsx                  # Карточки
│       ├── button.tsx                # Кнопки
│       └── input.tsx                 # Инпуты
└── hooks/
    └── data/
        └── useSubjects.ts            # Хук для работы с курсами
```

### Реализация:

#### `src/app/(main)/subjects/page.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Badge } from '@/src/components/ui/badge'
import { Search, Filter, BookOpen, Users, Clock, Star } from 'lucide-react'
import { useSubjectsQuery } from '@/src/hooks/data/useSubjectsQuery'
import { SubjectCard } from '@/src/components/course/subject-card'
import Link from 'next/link'

interface Subject {
  id: string
  title: string
  description: string
  lessonCount: number
  studentCount: number
  rating: number
  category: string
}

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: subjects, isLoading, error } = useSubjectsQuery()

  const filteredSubjects = subjects?.filter(subject => {
    const matchesSearch = subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || subject.category === selectedCategory
    return matchesSearch && matchesCategory
  }) || []

  const categories = ['all', 'programming', 'design', 'data-science', 'business']

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h2>
          <p className="text-gray-600">Не удалось загрузить курсы. Попробуйте обновить страницу.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Каталог курсов</h1>
        <p className="text-gray-600">Выберите курс для начала обучения</p>
      </div>

      {/* Поиск и фильтры */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            Все
          </Button>
          <Button
            variant={selectedCategory === 'programming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('programming')}
          >
            Программирование
          </Button>
          <Button
            variant={selectedCategory === 'design' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('design')}
          >
            Дизайн
          </Button>
          <Button
            variant={selectedCategory === 'data-science' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('data-science')}
          >
            Data Science
          </Button>
          <Button
            variant={selectedCategory === 'business' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('business')}
          >
            Бизнес
          </Button>
        </div>
      </div>

      {/* Список курсов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
          />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Курсы не найдены</h3>
          <p className="text-gray-600 mb-4">
            Попробуйте изменить поисковый запрос или выбрать другую категорию
          </p>
          <Button onClick={() => {
            setSearchQuery('')
            setSelectedCategory('all')
          }}>
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  )
}
```

#### `src/components/course/subject-card.tsx`
```typescript
'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { 
  Clock, 
  Users, 
  Star,
  BookOpen,
  PlayCircle
} from 'lucide-react'

interface Subject {
  id: string
  title: string
  description: string
  lessonCount: number
  studentCount: number
  rating: number
  category: string
}

interface SubjectCardProps {
  subject: Subject
}

const SubjectCard = memo(({ subject }: SubjectCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming':
        return 'bg-blue-100 text-blue-800'
      case 'design':
        return 'bg-purple-100 text-purple-800'
      case 'data-science':
        return 'bg-green-100 text-green-800'
      case 'business':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'programming':
        return 'Программирование'
      case 'design':
        return 'Дизайн'
      case 'data-science':
        return 'Data Science'
      case 'business':
        return 'Бизнес'
      default:
        return 'Другое'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-blue-400" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{subject.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {subject.description}
            </CardDescription>
          </div>
        </div>
        
        <Badge className={getCategoryColor(subject.category)}>
          {getCategoryName(subject.category)}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{subject.lessonCount} уроков</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{subject.studentCount} студентов</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{subject.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            asChild
            size="sm"
          >
            <Link href={`/subjects/${subject.id}`}>
              <PlayCircle className="w-4 h-4 mr-2" />
              Начать обучение
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

SubjectCard.displayName = 'SubjectCard'

export default SubjectCard
```

#### `src/hooks/data/useSubjectsQuery.ts`
```typescript
import { useQuery } from '@tanstack/react-query'
import { getSubjects } from '@/src/api/requests/subjects'

export function useSubjectsQuery() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
  })
}
```

---

## 4. Страница урока

### Структура файлов:
```
src/
├── app/
│   ├── (main)/
│   │   ├── lessons/
│   │   │   └── [lessonId]/
│   │   │       ├── page.tsx          # Страница урока
│   │   │       ├── materials/
│   │   │       │   └── page.tsx      # Материалы урока
│   │   │       └── quiz/
│   │   │           └── page.tsx      # Тест урока
│   │   └── layout.tsx                # Layout для авторизованных
├── components/
│   ├── lesson/
│   │   ├── lesson-player.tsx         # Плеер урока
│   │   ├── lesson-content.tsx        # Контент урока
│   │   ├── lesson-progress.tsx       # Прогресс урока
│   │   └── materials-list.tsx        # Список материалов
│   └── ui/
│       ├── video-player.tsx          # Видео плеер
│       └── progress.tsx              # Прогресс бар
└── hooks/
    └── data/
        └── useLesson.ts              # Хук для работы с уроками
```

### Реализация:

#### `src/app/(main)/lessons/[lessonId]/page.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { Progress } from '@/src/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import { 
  Clock, 
  Users, 
  Star,
  BookOpen,
  PlayCircle,
  Download,
  FileText,
  Video,
  CheckCircle
} from 'lucide-react'
import { LessonPlayer } from '@/src/components/lesson/lesson-player'
import { LessonProgress } from '@/src/components/lesson/lesson-progress'
import { MaterialsList } from '@/src/components/lesson/materials-list'
import { useLessonQuery } from '@/src/hooks/data/useLessonQuery'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  description: string
  content: string
  duration: number
  order: number
  isCompleted: boolean
  nextLessonId?: string
  previousLessonId?: string
  materials: Array<{
    id: string
    name: string
    type: 'pdf' | 'video' | 'doc' | 'zip'
    url: string
    size: string
  }>
  quiz?: {
    id: string
    title: string
    questionsCount: number
    timeLimit: number
  }
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const [currentTab, setCurrentTab] = useState('content')
  
  const { data: lesson, isLoading, error } = useLessonQuery(lessonId)

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h2>
          <p className="text-gray-600">Не удалось загрузить урок. Попробуйте обновить страницу.</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Урок не найден</h2>
          <p className="text-gray-600 mb-4">Извините, мы не смогли найти запрашиваемый урок.</p>
          <Button onClick={() => window.history.back()}>
            Назад
          </Button>
        </div>
      </div>
    )
  }

  const handleCompleteLesson = async () => {
    // Логика завершения урока
    console.log('Lesson completed:', lesson.id)
  }

  const handleLessonChange = (lessonId: string) => {
    // Навигация к другому уроку
    window.location.href = `/lessons/${lessonId}`
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Навигация */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/subjects">
            <BookOpen className="w-4 h-4 mr-2" />
            К курсам
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {lesson.description}
                  </CardDescription>
                </div>
                <Badge className={lesson.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {lesson.isCompleted ? 'Завершен' : 'В процессе'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Контент</TabsTrigger>
                  <TabsTrigger value="materials">Материалы</TabsTrigger>
                  {lesson.quiz && (
                    <TabsTrigger value="quiz">Тест</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <LessonPlayer lesson={lesson} />
                </TabsContent>

                <TabsContent value="materials" className="mt-6">
                  <MaterialsList materials={lesson.materials} />
                </TabsContent>

                {lesson.quiz && (
                  <TabsContent value="quiz" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{lesson.quiz.title}</CardTitle>
                        <CardDescription>
                          Тест для проверки усвоенного материала
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span>{lesson.quiz.questionsCount} вопросов</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.quiz.timeLimit} минут</span>
                            </div>
                          </div>
                          <Button className="w-full" asChild>
                            <Link href={`/lessons/${lesson.id}/quiz`}>
                              Начать тест
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          <LessonProgress
            lessons={[
              {
                id: '1',
                title: 'Введение',
                description: 'Основные понятия',
                duration: 15,
                order: 1,
                isCompleted: true,
                isCurrent: false,
                nextLessonId: '2'
              },
              {
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                duration: lesson.duration,
                order: lesson.order,
                isCompleted: lesson.isCompleted,
                isCurrent: true,
                nextLessonId: lesson.nextLessonId,
                previousLessonId: lesson.previousLessonId
              }
            ]}
            currentLessonId={lesson.id}
            onLessonChange={handleLessonChange}
            onCompleteLesson={handleCompleteLesson}
          />

          {lesson.nextLessonId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Следующий урок</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href={`/lessons/${lesson.nextLessonId}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Продолжить
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
```

#### `src/components/lesson/lesson-player.tsx`
```typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Progress } from '@/src/components/ui/progress'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  SkipBack,
  SkipForward,
  Fullscreen,
  Download
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  videoUrl?: string
  materials: Array<{
    id: string
    name: string
    type: 'pdf' | 'video' | 'doc' | 'zip'
    url: string
    size: string
  }>
}

interface LessonPlayerProps {
  lesson: Lesson
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(lesson.duration * 60) // в секундах
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Имитация воспроизведения видео
    let interval: NodeJS.Timeout
    
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentTime, duration])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Видеоурок</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Видео плеер */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {lesson.videoUrl ? (
              <video
                ref={videoRef}
                src={lesson.videoUrl}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                muted={isMuted}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8" />
                  </div>
                  <p>Видео недоступно</p>
                </div>
              </div>
            )}
            
            {/* Контрольные кнопки */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center gap-4 mb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCurrentTime(0)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCurrentTime(duration)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 ml-auto"
                >
                  <Fullscreen className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-1" />
                <div className="flex justify-between text-xs text-white/70">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Текстовый контент */}
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 5. Административная панель

### Структура файлов:
```
src/
├── app/
│   ├── (main)/
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Layout админки
│   │   │   ├── page.tsx              # Главная админки
│   │   │   ├── users/
│   │   │   │   ├── page.tsx          # Управление пользователями
│   │   │   │   └── [userId]/
│   │   │   │       └── page.tsx      # Редактирование пользователя
│   │   │   ├── subjects/
│   │   │   │   ├── page.tsx          # Управление курсами
│   │   │   │   └── [subjectId]/
│   │   │   │       ├── page.tsx      # Редактирование курса
│   │   │   │       └── topics/
│   │   │   │           └── [topicId]/
│   │   │   │               └── page.tsx # Редактирование темы
│   │   │   └── analytics/
│   │   │       └── page.tsx          # Аналитика
│   │   └── layout.tsx                # Layout для авторизованных
├── components/
│   ├── admin/
│   │   ├── data-table.tsx           # Таблица с пагинацией
│   │   ├── user-management.tsx      # Управление пользователями
│   │   ├── course-builder.tsx       # Редактор курса
│   │   └── analytics-dashboard.tsx  # Дашборд аналитики
│   └── ui/
│       ├── table.tsx                 # Таблицы
│       ├── dialog.tsx               # Модальные окна
│       └── form.tsx                  # Формы
└── hooks/
    └── data/
        └── useAdmin.ts              # Хуки для админки
```

### Реализация:

#### `src/app/(main)/admin/page.tsx`
```typescript
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  TrendingUp,
  Settings,
  BarChart3,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = {
    totalUsers: 1247,
    totalCourses: 45,
    totalLessons: 320,
    activeUsers: 89
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Административная панель</h1>
        <p className="text-gray-600">Управление образовательной платформой</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% за последний месяц
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Курсы</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              +3 новых курса
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Уроки</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLessons}</div>
            <p className="text-xs text-muted-foreground">
              +25 уроков
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные пользователи</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Сейчас онлайн
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Управление пользователями
            </CardTitle>
            <CardDescription>
              Просмотр и редактирование пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Всего пользователей:</span>
                <Badge>{stats.totalUsers}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Активных:</span>
                <Badge variant="default">{stats.activeUsers}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Новых за месяц:</span>
                <Badge variant="secondary">156</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/admin/users">
                Управлять пользователями
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Управление курсами
            </CardTitle>
            <CardDescription>
              Создание и редактирование курсов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Всего курсов:</span>
                <Badge>{stats.totalCourses}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Активных:</span>
                <Badge variant="default">42</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>В разработке:</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1" asChild>
                <Link href="/admin/subjects">
                  Управлять курсами
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/subjects/create">
                  <Plus className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Аналитика
            </CardTitle>
            <CardDescription>
              Статистика и аналитика платформы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Средний прогресс:</span>
                <Badge variant="default">68%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Завершенных курсов:</span>
                <Badge variant="secondary">234</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Выдано сертификатов:</span>
                <Badge variant="secondary">189</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/admin/analytics">
                Просмотреть аналитику
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Последние действия */}
      <Card>
        <CardHeader>
          <CardTitle>Последние действия</CardTitle>
          <CardDescription>
            Последние действия пользователей и администраторов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Новый пользователь зарегистрирован</p>
                <p className="text-xs text-gray-600">Иван Петров • 5 минут назад</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Завершен курс "JavaScript основы"</p>
                <p className="text-xs text-gray-600">Мария Сидорова • 15 минут назад</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Обновлен курс "Веб-разработка"</p>
                <p className="text-xs text-gray-600">Администратор • 1 час назад</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 6. Система прогресса и сертификатов

### Структура файлов:
```
src/
├── app/
│   ├── (main)/
│   │   ├── progress/
│   │   │   └── page.tsx              # Страница прогресса
│   │   ├── certificates/
│   │   │   ├── page.tsx              # Страница сертификатов
│   │   │   └── [id]/
│   │   │       └── preview/
│   │   │           └── page.tsx      # Просмотр сертификата
│   │   └── layout.tsx                # Layout для авторизованных
├── components/
│   ├── progress/
│   │   ├── progress-chart.tsx        # График прогресса
│   │   ├── lesson-progress.tsx       # Прогресс урока
│   │   └── stats-card.tsx            # Карточка статистики
│   ├── certificate/
│   │   ├── certificate-card.tsx      # Карточка сертификата
│   │   └── certificate-preview.tsx   # Предпросмотр сертификата
│   └── ui/
│       ├── progress.tsx              # Прогресс бар
│       ├── badge.tsx                 # Бейджи
│       └── tabs.tsx                  # Табы
└── hooks/
    └── data/
        └── useProgress.ts            # Хуки для прогресса
```

### Реализация:

#### `src/app/(main)/progress/page.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Progress } from '@/src/components/ui/progress'
import { Badge } from '@/src/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import { 
  BookOpen, 
  Clock, 
  Award, 
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  PlayCircle,
  BarChart3,
  Users
} from 'lucide-react'
import Link from 'next/link'

interface CourseProgress {
  id: string
  title: string
  description: string
  totalLessons: number
  completedLessons: number
  progress: number
  lastAccessed: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  certificate?: {
    id: string
    issuedAt: string
    downloadUrl: string
  }
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<CourseProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Здесь будет загрузка данных прогресса с API
    const mockData: CourseProgress[] = [
      {
        id: '1',
        title: 'Веб-разработка с нуля',
        description: 'Полный курс по веб-разработке для начинающих',
        totalLessons: 40,
        completedLessons: 18,
        progress: 45,
        lastAccessed: '2024-01-20',
        status: 'IN_PROGRESS'
      },
      {
        id: '2',
        title: 'JavaScript основы',
        description: 'Основы программирования на JavaScript',
        totalLessons: 25,
        completedLessons: 25,
        progress: 100,
        lastAccessed: '2024-01-15',
        status: 'COMPLETED',
        certificate: {
          id: 'cert-1',
          issuedAt: '2024-01-16',
          downloadUrl: '/certificates/js-basics.pdf'
        }
      },
      {
        id: '3',
        title: 'Python для анализа данных',
        description: 'Анализ данных с использованием Python',
        totalLessons: 35,
        completedLessons: 0,
        progress: 0,
        lastAccessed: '2024-01-10',
        status: 'NOT_STARTED'
      }
    ]

    setTimeout(() => {
      setProgressData(mockData)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800">Завершен</Badge>
      case 'IN_PROGRESS':
        return <Badge className="bg-blue-100 text-blue-800">В процессе</Badge>
      case 'NOT_STARTED':
        return <Badge variant="secondary">Не начат</Badge>
      default:
        return <Badge variant="secondary">Неизвестно</Badge>
    }
  }

  const getStats = () => {
    const totalCourses = progressData.length
    const completedCourses = progressData.filter(p => p.status === 'COMPLETED').length
    const inProgressCourses = progressData.filter(p => p.status === 'IN_PROGRESS').length
    const totalProgress = progressData.reduce((sum, p) => sum + p.progress, 0) / totalCourses || 0

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalProgress: Math.round(totalProgress)
    }
  }

  const stats = getStats()

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Мой прогресс</h1>
        <p className="text-gray-600">Отслеживайте ваше обучение и достижения</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего курсов</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedCourses} завершено
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний прогресс</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProgress}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.inProgressCourses} в процессе
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершено</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.completedCourses / stats.totalCourses) * 100)}% от общего
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сертификаты</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <p className="text-xs text-muted-foreground">
              Готовы к скачиванию
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Курсы</TabsTrigger>
          <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progressData.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.description}
                      </CardDescription>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Прогресс</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.completedLessons}/{course.totalLessons} уроков</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(course.lastAccessed).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {course.status === 'NOT_STARTED' ? (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/courses/${course.id}`}>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Начать
                          </Link>
                        </Button>
                      ) : course.status === 'IN_PROGRESS' ? (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/lessons/${course.id}/current`}>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Продолжить
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/courses/${course.id}`}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Повторить
                          </Link>
                        </Button>
                      )}
                      
                      {course.certificate && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={course.certificate.downloadUrl}>
                            <Award className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressData
              .filter(course => course.certificate)
              .map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      {course.title}
                    </CardTitle>
                    <CardDescription>
                      Сертификат о завершении курса
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-video bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg flex items-center justify-center border-2 border-dashed border-yellow-200">
                        <div className="text-center">
                          <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                          <p className="text-sm text-gray-600">Предпросмотр сертификата</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Дата выдачи:</span>
                        <span className="font-medium">
                          {new Date(course.certificate!.issuedAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={course.certificate!.downloadUrl}>
                            <Download className="w-4 h-4 mr-2" />
                            Скачать PDF
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/certificates/${course.certificate!.id}/preview`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Первый курс
                </CardTitle>
                <CardDescription>
                  Завершите первый курс
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {stats.completedCourses > 0 ? '✅ Получено' : '🔒 Не получено'}
                  </p>
                  <Button size="sm" disabled={stats.completedCourses === 0}>
                    {stats.completedCourses > 0 ? 'Просмотреть' : 'Завершить курс'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Сообщество
                </CardTitle>
                <CardDescription>
                  Присоединяйтесь к сообществу
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    🔒 Не получено
                  </p>
                  <Button size="sm" variant="outline">
                    Присоединиться
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Аналитик
                </CardTitle>
                <CardDescription>
                  Завершите 5 курсов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {stats.completedCourses >= 5 ? '✅ Получено' : `🔒 ${5 - stats.completedCourses} осталось`}
                  </p>
                  <Button size="sm" disabled={stats.completedCourses < 5}>
                    {stats.completedCourses >= 5 ? 'Просмотреть' : 'Продолжить обучение'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## 7. Оптимизация производительности

### Структура файлов:
```
src/
├── components/
│   ├── ui/
│   │   ├── loading-skeleton.tsx       # Скелетон загрузки
│   │   ├── virtualized-list.tsx       # Виртуализированный список
│   │   ├── pagination.tsx            # Пагинация
│   │   ├── search-input.tsx          # Поиск с debounce
│   │   ├── toast.tsx                 # Уведомления
│   │   └── error-boundary.tsx        # Граница ошибок
│   └── layout/
│       └── theme-toggle.tsx         # Переключатель темы
├── hooks/
│   ├── ui/
│   │   └── useToast.ts               # Хук уведомлений
│   └── data/
│       └── useOptimizedQuery.ts      # Оптимизированный запрос
└── lib/
    └── utils.ts                      # Утилиты
```

### Реализация:

#### `src/components/ui/loading-skeleton.tsx`
```typescript
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  height?: string
  width?: string
}

export function LoadingSkeleton({
  className,
  lines = 3,
  height = 'h-4',
  width = 'w-full'
}: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gray-200 rounded',
            height,
            i === lines - 1 ? width : 'w-full'
          )}
        >
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

interface CardSkeletonProps {
  className?: string
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div className={cn('bg-white rounded-lg border p-6', className)}>
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-20" />
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}
```

#### `src/hooks/ui/useToast.ts`
```typescript
import { useEffect, useState } from 'react'
import { toast, Toast as ToastType } from '@/components/ui/toast'

export interface ToastOptions {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: React.ReactNode
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = ({ title, description, variant = 'default', action, duration = 5000 }: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9)
    
    const toastData = {
      id,
      title,
      description,
      variant,
      action,
      duration
    }

    setToasts((prev) => [...prev, toastData])

    // Автоматическое удаление уведомления
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (title: string, description?: string) => {
    return addToast({ title, description, variant: 'default' })
  }

  const error = (title: string, description?: string) => {
    return addToast({ title, description, variant: 'destructive' })
  }

  const info = (title: string, description?: string) => {
    return addToast({ title, description, variant: 'default' })
  }

  const warning = (title: string, description?: string) => {
    return addToast({ title, description, variant: 'destructive' })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}
```

---

## Заключение

Эта документация предоставляет полное руководство по реализации образовательной платформы с нуля. Каждый компонент реализован с учетом современных практик разработки, оптимизации производительности и удобства использования.

### Ключевые особенности реализации:

1. **Модульная архитектура** - четкое разделение ответственности
2. **Полная типизация** - безопасность и надежность кода
3. **Оптимизация производительности** - мемоизация, lazy loading, virtualization
4. **Отзывчивый дизайн** - адаптация под все устройства
5. **Удобство разработки** - готовые компоненты и хуки

Структура готова к использованию и может быть легко расширена при необходимости добавления новых функциональных возможностей.