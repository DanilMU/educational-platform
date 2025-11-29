# Оптимизация производительности и UX

## 🚀 Оптимизация производительности

### 1. Code Splitting и Lazy Loading

#### 1.1 Динамическая импортация компонентов
```typescript
// frontend/src/components/lazy/lazy-components.tsx
import { lazy, Suspense } from 'react'

// Ленивая загрузка тяжелых компонентов
export const LazyHeroSection = lazy(() => import('./parallax/deep-parallax-hero'))
export const LazySubjectCard = lazy(() => import('./subjects/subject-card-enhanced'))
export const LazyQuizView = lazy(() => import('./quiz/quiz-view-enhanced'))
export const LazyAdminDashboard = lazy(() => import('./admin/admin-dashboard'))

// Обертка для ленивой загрузки
export function LazyWrapper({ children, fallback }: { 
  children: React.ReactNode 
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback || <div className="h-64 bg-gray-100 animate-pulse" />}>
      {children}
    </Suspense>
  )
}
```

#### 1.2 Маршрутизация с ленивой загрузкой
```typescript
// frontend/src/app/layout.tsx
import { lazy, Suspense } from 'react'
import { LazyWrapper } from '@/src/components/lazy/lazy-components'

const AdminLayout = lazy(() => import('./admin/layout'))
const AdminDashboard = lazy(() => import('./admin/page'))

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Suspense fallback={<div className="h-screen bg-gray-50 animate-pulse" />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
```

### 2. Оптимизация изображений

#### 2.1 Оптимизированный компонент изображений
```typescript
// frontend/src/components/ui/optimized-image.tsx
'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  placeholder = 'blur'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
  }, [src])

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        placeholder={placeholder}
        className={`transition-all duration-500 ${
          isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-gray-400 mb-2">Изображение недоступно</div>
            <div className="text-sm text-gray-500">{alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
```

#### 2.2 WebP формат и responsive изображения
```typescript
// frontend/src/components/ui/responsive-image.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={85}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
```

### 3. Оптимизация бандла

#### 3.1 Динамические импорты библиотек
```typescript
// frontend/src/lib/dynamic-imports.ts
export const loadFramerMotion = () => import('framer-motion')
export const loadThree = () => import('three')
export const loadRecharts = () => import('recharts')
export const loadReactThreeFiber = () => import('@react-three/fiber')
export const loadReactThreeDrei = () => import('@react-three/drei')
```

#### 3.2 Конфигурация Next.js
```typescript
// frontend/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif', 'image/jpeg'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'three', 'recharts'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
          ui: {
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 8,
          },
          animations: {
            test: /[\\/]src[\\/]components[\\/]animations[\\/]/,
            name: 'animations',
            chunks: 'all',
            priority: 7,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
```

### 4. Кэширование и оптимизация запросов

#### 4.1 Оптимизированные хуки данных
```typescript
// frontend/src/hooks/use-optimized-query.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

interface OptimizedQueryOptions {
  queryKey: string[]
  queryFn: () => Promise<any>
  staleTime?: number
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
}

export function useOptimizedQuery({
  queryKey,
  queryFn,
  staleTime = 5 * 60 * 1000, // 5 минут
  cacheTime = 10 * 60 * 1000, // 10 минут
  refetchOnWindowFocus = false,
  refetchOnMount = false,
}: OptimizedQueryOptions) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
    refetchOnMount,
  })

  const refetch = useCallback(() => {
    return queryClient.refetchQueries({ queryKey })
  }, [queryClient, queryKey])

  const invalidate = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey })
  }, [queryClient, queryKey])

  const prefetch = useCallback(() => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime,
      cacheTime,
    })
  }, [queryClient, queryKey, queryFn, staleTime, cacheTime])

  return {
    ...query,
    refetch,
    invalidate,
    prefetch,
  }
}
```

#### 4.2 Оптимизированные API запросы
```typescript
// frontend/src/api/optimized-requests.ts
import axios from 'axios'
import { useOptimizedQuery } from '@/src/hooks/use-optimized-query'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

// Кэширование запросов
const cache = new Map()

export const optimizedRequest = async (url: string, options = {}) => {
  const cacheKey = `${url}_${JSON.stringify(options)}`
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    const response = await api(url, options)
    const data = response.data
    
    // Кэшируем ответ на 5 минут
    cache.set(cacheKey, data)
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000)
    
    return data
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

// Оптимизированные хуки
export const useOptimizedSubjects = () => {
  return useOptimizedQuery({
    queryKey: ['subjects'],
    queryFn: () => optimizedRequest('/subjects'),
    staleTime: 10 * 60 * 1000, // 10 минут
  })
}

export const useOptimizedUserProgress = () => {
  return useOptimizedQuery({
    queryKey: ['user-progress'],
    queryFn: () => optimizedRequest('/user/progress'),
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}
```

## 🎯 UX оптимизация

### 1. Улучшенная навигация

#### 1.1 Адаптивная навигация
```typescript
// frontend/src/components/layout/responsive-navigation-enhanced.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen, User, Settings, Home } from 'lucide-react'

export function ResponsiveNavigationEnhanced() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Главная', icon: Home },
    { href: '/subjects', label: 'Курсы', icon: BookOpen },
    { href: '/dashboard', label: 'Личный кабинет', icon: User },
    { href: '/settings', label: 'Настройки', icon: Settings },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Образование</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
```

### 2. Улучшенные формы

#### 2.1 Адаптивная форма с валидацией
```typescript
// frontend/src/components/forms/enhanced-form.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: z.string(),
  agree: z.boolean().refine(val => val === true, 'Вы должны согласиться с условиями'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

interface EnhancedFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
  title: string
  description: string
}

export function EnhancedForm({ onSubmit, title, description }: EnhancedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      await onSubmit(data)
      setIsSubmitted(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Успешно!
            </h3>
            <p className="text-gray-600 mb-6">
              Ваша заявка успешно отправлена
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Вернуться к форме
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              {...register('agree')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="agree" className="text-sm">
              Я согласен с условиями использования
            </Label>
          </div>
          {errors.agree && (
            <p className="text-sm text-red-600">{errors.agree.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              'Отправить'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 3. Оптимизация загрузки

#### 3.1 Скелетоны загрузки
```typescript
// frontend/src/components/ui/skeleton-enhanced.tsx
import { cn } from '@/src/lib/utils'

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded-md',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardSkeletonProps {
  count?: number
}

export function CardSkeleton({ count = 1 }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-6" />
            ))}
          </div>
        ))}
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-8" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
```

#### 3.2 Предзагрузка контента
```typescript
// frontend/src/components/ui/preload-content.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from './skeleton-enhanced'

interface PreloadContentProps {
  children: React.ReactNode
  preloadTrigger?: boolean
  fallback?: React.ReactNode
}

export function PreloadContent({
  children,
  preloadTrigger = true,
  fallback
}: PreloadContentProps) {
  const [isLoaded, setIsLoaded] = useState(!preloadTrigger)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!preloadTrigger) {
      setShowContent(true)
      return
    }

    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => setShowContent(true), 300)
    }, 1000)

    return () => clearTimeout(timer)
  }, [preloadTrigger])

  if (!showContent) {
    return fallback || <Skeleton className="w-full h-64" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

### 4. Оптимизация мобильного опыта

#### 4.1 Адаптивные компоненты
```typescript
// frontend/src/components/ui/responsive-container.tsx
'use client'

import { useMediaQuery } from '@/src/hooks/use-media-query'
import { cn } from '@/src/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  mobileClassName?: string
  tabletClassName?: string
  desktopClassName?: string
}

export function ResponsiveContainer({
  children,
  className,
  mobileClassName,
  tabletClassName,
  desktopClassName,
}: ResponsiveContainerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  const responsiveClassName = cn(
    className,
    isMobile && mobileClassName,
    isTablet && tabletClassName,
    isDesktop && desktopClassName
  )

  return <div className={responsiveClassName}>{children}</div>
}

// Пример использования
export function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveContainer
      mobileClassName="grid-cols-1 gap-4"
      tabletClassName="grid-cols-2 gap-6"
      desktopClassName="grid-cols-3 gap-8"
      className="grid"
    >
      {children}
    </ResponsiveContainer>
  )
}
```

#### 4.2 Touch-оптимизированные компоненты
```typescript
// frontend/src/components/ui/touch-button.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { cn } from '@/src/lib/utils'

interface TouchButtonProps {
  children: React.ReactNode
  className?: string
  onTouchStart?: () => void
  onTouchEnd?: () => void
  onClick?: () => void
}

export function TouchButton({
  children,
  className,
  onTouchStart,
  onTouchEnd,
  onClick,
}: TouchButtonProps) {
  const [isTouched, setIsTouched] = useState(false)

  const handleTouchStart = () => {
    setIsTouched(true)
    onTouchStart?.()
  }

  const handleTouchEnd = () => {
    setIsTouched(false)
    onTouchEnd?.()
  }

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'select-none',
        className
      )}
    >
      <Button
        className={cn(
          'w-full h-14 text-lg font-medium',
          isTouched && 'bg-blue-600 text-white'
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  )
}
```

## 📊 Метрики производительности

### 1. Web Vitals
```typescript
// frontend/src/components/analytics/web-vitals.tsx
'use client'

import { useEffect, useState } from 'react'

interface WebVitals {
  FCP: number
  LCP: number
  CLS: number
  FID: number
  TTFB: number
}

export function WebVitals() {
  const [vitals, setVitals] = useState<WebVitals | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const vitalsData: Partial<WebVitals> = {}

        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            vitalsData.FCP = entry.startTime
          } else if (entry.name === 'largest-contentful-paint') {
            vitalsData.LCP = entry.startTime
          } else if (entry.name === 'cumulative-layout-shift') {
            vitalsData.CLS = entry.value
          } else if (entry.name === 'first-input-delay') {
            vitalsData.FID = entry.startTime
          } else if (entry.name === 'time-to-first-byte') {
            vitalsData.TTFB = entry.startTime
          }
        })

        setVitals(vitalsData as WebVitals)
      })

      observer.observe({ entryTypes: ['paint', 'layout-shift', 'first-input', 'navigation'] })

      return () => observer.disconnect()
    }
  }, [])

  if (!vitals) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold mb-3">Web Vitals</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>FCP (First Contentful Paint):</span>
          <span className={vitals.FCP < 1800 ? 'text-green-600' : 'text-red-600'}>
            {vitals.FCP?.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP (Largest Contentful Paint):</span>
          <span className={vitals.LCP < 2500 ? 'text-green-600' : 'text-red-600'}>
            {vitals.LCP?.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS (Cumulative Layout Shift):</span>
          <span className={vitals.CLS < 0.1 ? 'text-green-600' : 'text-red-600'}>
            {vitals.CLS?.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID (First Input Delay):</span>
          <span className={vitals.FID < 100 ? 'text-green-600' : 'text-red-600'}>
            {vitals.FID?.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB (Time to First Byte):</span>
          <span className={vitals.TTFB < 600 ? 'text-green-600' : 'text-red-600'}>
            {vitals.TTFB?.toFixed(0)}ms
          </span>
        </div>
      </div>
    </div>
  )
}
```

### 2. Мониторинг производительности
```typescript
// frontend/src/hooks/use-performance-monitor.ts
import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  fps: number
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Время загрузки
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.loadEventStart

      // Время рендеринга
      const renderStart = performance.now()
      requestAnimationFrame(() => {
        const renderEnd = performance.now()
        const renderTime = renderEnd - renderStart

        // Использование памяти
        const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

        // FPS
        let lastTime = performance.now()
        let frames = 0
        let fps = 0

        const measureFPS = () => {
          frames++
          const currentTime = performance.now()
          if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime))
            frames = 0
            lastTime = currentTime
          }
          requestAnimationFrame(measureFPS)
        }

        measureFPS()

        setMetrics({
          loadTime,
          renderTime,
          memoryUsage,
          fps,
        })
      })
    }
  }, [])

  return metrics
}
```

## 🎯 Рекомендации по оптимизации

### 1. Критические пути загрузки
- Используйте `next/font` для оптимизации шрифтов
- Включите `next/image` для оптимизации изображений
- Используйте `next/script` для оптимизации скриптов
- Минимизируйте CSS и JavaScript бандлы

### 2. Кэширование
- Включите Service Worker для офлайн-доступа
- Используйте кэширование на уровне CDN
- Реализуйте стратегию кэширования для API запросов
- Используйте кэширование браузера для статических ресурсов

### 3. Сеть
- Используйте HTTP/2 или HTTP/3
- Включите сжатие Gzip/Brotli
- Оптимизируйте количество запросов
- Используйте lazy loading для изображений и iframe

### 4. Рендеринг
- Используйте virtual scrolling для длинных списков
- Оптимизируйте React компоненты с помощью React.memo
- Используйте useMemo и useCallback для оптимизации вычислений
- Реализуйте code splitting для тяжелых компонентов

---

**Оптимизация производительности и UX завершена!** 🚀