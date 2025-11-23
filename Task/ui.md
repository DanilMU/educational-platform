# UI - Библиотеки для дизайна, параллакс эффекты и визуальные улучшения

## Основные библиотеки для дизайна

### 1. Анимации и микровзаимодействия
```json
{
  "framer-motion": "^11.0.0",
  "react-spring": "^9.7.0",
  "react-intersection-observer": "^9.8.0",
  "react-use-gesture": "^9.1.3"
}
```

**Использование:**
- `framer-motion` - основные анимации, жесты, параллакс
- `react-spring` - физически точные анимации
- `react-intersection-observer` - анимации при появлении в viewport
- `react-use-gesture` - обработка жестов и взаимодействий

### 2. 3D и визуальные эффекты
```json
{
  "three": "^0.158.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.114.3",
  "maath": "^0.10.4"
}
```

**Использование:**
- `three` + `@react-three/fiber` - 3D графика в React
- `@react-three/drei` - полезные утилиты для three.js
- `maath` - математические утилиты для 3D

### 3. Параллакс и скроллинг эффекты
```json
{
  "react-parallax": "^3.2.0",
  "react-scroll-parallax": "^3.3.0",
  "locomotive-scroll": "^5.0.0",
  "react-reveal": "^1.2.2"
}
```

**Использование:**
- `react-parallax` - базовые параллакс эффекты
- `react-scroll-parallax` - параллакс при скролле
- `locomotive-scroll` - кастомный скролл с эффектами
- `react-reveal` - анимации при скролле

### 4. Графики и визуализация данных
```json
{
  "recharts": "^2.12.7",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "d3": "^7.8.5"
}
```

**Использование:**
- `recharts` - React компоненты для графиков
- `chart.js` + `react-chartjs-2` - мощная библиотека графиков
- `d3` - низкоуровневая визуализация данных

### 5. Иконки и иллюстрации
```json
{
  "lucide-react": "^0.554.0",
  "react-icons": "^4.12.0",
  "tabler-icons-react": "^1.56.0",
  "react-feather": "^2.0.10"
}
```

**Использование:**
- `lucide-react` - современные иконки (уже используется)
- `react-icons` - огромная коллекция иконок
- `tabler-icons-react` - минималистичные иконки
- `react-feather` - иконки в стиле Feather

### 6. Шрифты и типографика
```json
{
  "next/font": "^13.0.0",
  "inter-font": "^4.0.0",
  "geist-font": "^1.0.0"
}
```

**Использование:**
- `next/font` - оптимизированные шрифты в Next.js
- `inter-font` - шрифт Inter для лучшей читаемости
- `geist-font` - современный шрифт от Vercel

## Параллакс эффекты и визуальные улучшения

### 1. Глубокий параллакс для Hero секции
```typescript
// components/parallax/HeroParallax.tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
      />
      <FloatingParticles />
    </div>
  )
}
```

### 2. 3D параллакс карточек
```typescript
// components/parallax/3DCard.tsx
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'

interface Card3DProps {
  children: React.ReactNode
  className?: string
}

export function Card3D({ children, className }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }
  
  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 3. Интерактивный фон с частицами
```typescript
// components/particles/ParticleBackground.tsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Инициализация частиц
    const initParticles = () => {
      particles.current = []
      for (let i = 0; i < 50; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }
    
    // Анимация частиц
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Границы
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Рисование
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    // Обработка изменения размера
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
```

### 4. Скролл-триггерные анимации
```typescript
// components/animations/ScrollReveal.tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function ScrollReveal({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 5. Градиентные эффекты и glassmorphism
```typescript
// components/effects/GlassCard.tsx
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg'
  border?: boolean
}

export function GlassCard({ 
  children, 
  className = '',
  blur = 'md',
  border = true
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  }
  
  return (
    <motion.div
      className={cn(
        'relative bg-white/10 dark:bg-black/10',
        'border border-white/20 dark:border-white/10',
        'rounded-2xl p-6',
        blurClasses[blur],
        border && 'border border-white/20',
        className
      )}
      whileHover={{ 
        y: -4,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

## Цветовая схема и типографика

### 1. Расширенная цветовая палитра
```typescript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        }
      }
    }
  }
}
```

### 2. Типографические улучшения
```typescript
// app/globals.css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

body {
  font-family: var(--font-sans);
  font-feature-settings: "rlig" 1, "calt" 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Улучшенная читаемость */
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose h1, .prose h2, .prose h3 {
  font-weight: 700;
  line-height: 1.3;
}

.prose p {
  margin-bottom: 1.5em;
}
```

## Оптимизация производительности

### 1. Ленивая загрузка компонентов
```typescript
// components/lazy/LazyComponents.tsx
import { lazy, Suspense } from 'react'

export const LazyHeroSection = lazy(() => import('./HeroSection'))
export const LazySubjectCard = lazy(() => import('./SubjectCard'))
export const LazyQuizView = lazy(() => import('./QuizView'))

// Обертка для ленивой загрузки
export function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
      {children}
    </Suspense>
  )
}
```

### 2. Оптимизация изображений
```typescript
// components/ui/optimized-image.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '',
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
```

## Интеграция с существующим проектом

### 1. Обновление package.json
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react-intersection-observer": "^9.8.0",
    "react-spring": "^9.7.0",
    "three": "^0.158.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.114.3",
    "recharts": "^2.12.7",
    "react-chartjs-2": "^5.2.0",
    "locomotive-scroll": "^5.0.0"
  }
}
```

### 2. Создание дизайн-системы
```typescript
// components/design-system/theme.tsx
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Экспорт всех компонентов дизайн-системы
export * from './ui/button'
export * from './ui/card'
export * from './ui/input'
export * from './components/animations'
export * from './components/parallax'
export * from './components/particles'