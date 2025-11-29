# Улучшенные параллакс эффекты и визуальные компоненты

## 🎨 Современные визуальные эффекты

### 1. Глубокий параллакс для Hero секции

```typescript
// frontend/src/components/parallax/deep-parallax-hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypingAnimation } from '@aceternity-ui/react-typing-animation'
import { Spotlight } from '@aceternity-ui/react-spotlight'
import { MagicButton } from '@magicui/react-button'
import Link from 'next/link'

export function DeepParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновые слои */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
        <ParticleBackground />
        <FloatingShapes />
      </div>

      {/* Spotlight эффект */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-10"
      >
        <Spotlight
          className="absolute inset-0"
          fill="white"
          blur="2xl"
          radius="60%"
        />
      </motion.div>

      {/* Основной контент */}
      <motion.div
        style={{ y }}
        className="relative z-20 mx-auto max-w-6xl text-center px-4"
      >
        <div className="space-y-8">
          {/* Анимированный заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TypingAnimation
              text="Добро пожаловать на Образовательную платформу"
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              speed={100}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto"
            >
              Раскройте свой потенциал с интерактивными курсами, созданными для эффективного обучения
            </motion.p>
          </motion.div>

          {/* Интерактивные кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagicButton
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 text-xl shadow-2xl transform transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/auth/register">Начать обучение</Link>
            </MagicButton>
            
            <MagicButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-10 py-5 text-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/subjects">Просмотреть курсы</Link>
            </MagicButton>
          </motion.div>

          {/* Прогресс бар */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 rounded-full h-2 backdrop-blur-sm">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 2 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Нижний декор */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

// Фоновые частицы
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

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

// Плавающие фигуры
function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 100, color: 'rgba(59, 130, 246, 0.1)', delay: 0 },
    { type: 'square', size: 80, color: 'rgba(139, 92, 246, 0.1)', delay: 2 },
    { type: 'triangle', size: 120, color: 'rgba(236, 72, 153, 0.1)', delay: 4 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${20 + index * 30}%`,
            left: `${10 + index * 20}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 20 + index * 5,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="rounded-full"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: shape.color,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="rounded-lg"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: shape.color,
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
```

### 2. Интерактивные 3D карточки курсов

```typescript
// frontend/src/components/parallax/interactive-3d-card.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card3D } from './3d-card'
import { MagicCard } from '@magicui/react-card'
import { Progress } from '@/src/components/ui/progress'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { BookOpen, ArrowRight, Star, Clock, Users } from 'lucide-react'
import Link from 'next/link'

interface Interactive3DCardProps {
  subject: {
    id: string
    title: string
    description: string
    progress?: number
    lessons?: number
    category?: string
    rating?: number
    duration?: string
    studentsCount?: number
    instructor?: string
    image?: string
  }
}

export function Interactive3DCard({ subject }: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }

  return (
    <motion.div
      className="relative h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Световой эффект при наведении */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <Card3D className="h-full">
        <MagicCard
          className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 relative overflow-hidden"
          gradientSize={200}
          gradientColor="#3b82f6"
          gradientOpacity={0.3}
        >
          {/* Фоновый градиент */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
          
          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-blue-400/10 rounded-full blur-2xl" />

          <div className="relative h-full flex flex-col">
            {/* Изображение курса */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/80" />
              </div>
              
              {/* Категория */}
              {subject.category && (
                <Badge className="absolute top-4 left-4 bg-white/20 text-white backdrop-blur-sm">
                  {subject.category}
                </Badge>
              )}

              {/* Рейтинг */}
              {subject.rating && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{subject.rating}</span>
                </div>
              )}
            </div>

            {/* Контент */}
            <div className="flex-grow p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {subject.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {subject.description}
                </p>
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <BookOpen className="w-4 h-4" />
                  <span>{subject.lessons || 0} уроков</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{subject.duration || '2ч'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{subject.studentsCount || 0} студентов</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    {subject.instructor || 'Эксперт'}
                  </span>
                </div>
              </div>

              {/* Прогресс */}
              {subject.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Ваш прогресс</span>
                    <span className="text-white font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 bg-white/20" />
                </div>
              )}
            </div>

            {/* Футер */}
            <div className="p-6 pt-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 transform transition-all duration-300 hover:scale-105"
              >
                <Link href={`/subjects/${subject.id}`}>
                  {subject.progress ? 'Продолжить обучение' : 'Начать обучение'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </MagicCard>
      </Card3D>

      {/* Интерактивные частицы при наведении */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/50 rounded-full"
              style={{
                left: `${mousePosition.x + (Math.random() - 0.5) * 100}px`,
                top: `${mousePosition.y + (Math.random() - 0.5) * 100}px`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1, 0], 
                opacity: [1, 0.5, 0],
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
              }}
              transition={{ 
                duration: 1, 
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
```

### 3. Скролл-триггерные анимации

```typescript
// frontend/src/components/animations/scroll-triggered-animations.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useIntersectionObserver } from '@/src/hooks'

interface ScrollTriggeredProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function ScrollTriggered({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50
}: ScrollTriggeredProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
      default: return { y: distance }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up': return { y: 0 }
      case 'down': return { y: 0 }
      case 'left': return { x: 0 }
      case 'right': return { x: 0 }
      default: return { y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Комплексная секция с анимациями
export function AnimatedSection({ 
  children, 
  className = '',
  staggerChildren = 0.1
}: { 
  children: React.ReactNode
  className?: string
  staggerChildren?: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Появляющиеся элементы
export function FadeInUp({ 
  children, 
  className = '',
  delay = 0
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <ScrollTriggered 
      direction="up" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTriggered>
  )
}

// Появляющиеся элементы слева
export function FadeInLeft({ 
  children, 
  className = '',
  delay = 0
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <ScrollTriggered 
      direction="left" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTriggered>
  )
}

// Появляющиеся элементы справа
export function FadeInRight({ 
  children, 
  className = '',
  delay = 0
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <ScrollTriggered 
      direction="right" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTriggered>
  )
}
```

### 4. Интерактивный фон с частицами

```typescript
// frontend/src/components/particles/interactive-particle-background.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  connections: number[]
}

interface InteractiveParticleBackgroundProps {
  className?: string
  particleCount?: number
  colors?: string[]
  connectionDistance?: number
  mouseRadius?: number
}

export function InteractiveParticleBackground({
  className = '',
  particleCount = 100,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'],
  connectionDistance = 120,
  mouseRadius = 150
}: InteractiveParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const initParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          connections: []
        })
      }
      setParticles(newParticles)
    }

    const updateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let { x, y, vx, vy, size, opacity, color } = particle
        
        // Обновление позиции
        x += vx
        y += vy

        // Границы
        if (x < 0 || x > canvas.width) vx *= -1
        if (y < 0 || y > canvas.height) vy *= -1

        // Взаимодействие с мышью
        const dx = mousePosition.x - x
        const dy = mousePosition.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          vx -= (dx / distance) * force * 0.5
          vy -= (dy / distance) * force * 0.5
        }

        return { ...particle, x, y, vx, vy }
      }))
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Рисование соединений
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Рисование частиц
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    handleResize()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [particleCount, colors, connectionDistance, mouseRadius, mousePosition])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}
```

### 5. Glassmorphism компоненты

```typescript
// frontend/src/components/ui/glassmorphism/glass-card.tsx
'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/src/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'floating'
  blur?: 'sm' | 'md' | 'lg'
  gradient?: 'blue' | 'purple' | 'pink' | 'green'
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = 'default', blur = 'md', gradient = 'blue', ...props }, ref) => {
    const getGradient = () => {
      switch (gradient) {
        case 'blue': return 'from-blue-500/20 to-blue-600/20'
        case 'purple': return 'from-purple-500/20 to-purple-600/20'
        case 'pink': return 'from-pink-500/20 to-pink-600/20'
        case 'green': return 'from-green-500/20 to-green-600/20'
        default: return 'from-blue-500/20 to-blue-600/20'
      }
    }

    const getBlur = () => {
      switch (blur) {
        case 'sm': return 'backdrop-blur-sm'
        case 'md': return 'backdrop-blur-md'
        case 'lg': return 'backdrop-blur-lg'
        default: return 'backdrop-blur-md'
      }
    }

    const getVariant = () => {
      switch (variant) {
        case 'elevated': return 'shadow-2xl shadow-black/20'
        case 'floating': return 'shadow-2xl shadow-black/30 transform transition-all duration-300 hover:scale-105'
        default: return 'shadow-lg shadow-black/10'
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-white/20 bg-white/5',
          getBlur(),
          getVariant(),
          'overflow-hidden',
          className
        )}
        whileHover={variant === 'floating' ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Фоновый градиент */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`} />
        
        {/* Декоративные элементы */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/5 to-transparent" />
        </div>

        {/* Контент */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Glassmorphism кнопка
export const GlassButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative px-6 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md',
          'text-white font-medium transition-all duration-300',
          'hover:bg-white/10 hover:border-white/30',
          'active:scale-95',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

// Glassmorphism input
export const GlassInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md',
          'text-white placeholder-white/50',
          'focus:outline-none focus:ring-2 focus:ring-white/20',
          'transition-all duration-300',
          className
        )}
        whileFocus={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
        {...props}
      />
    )
  }
)

GlassInput.displayName = 'GlassInput'
```

## 🎯 Интеграция с существующими компонентами

### 1. Обновление Hero секции
```typescript
// Замена существующей Hero секции на новую
// frontend/src/components/home/hero-section.tsx
import { DeepParallaxHero } from '@/src/components/parallax/deep-parallax-hero'

export function HeroSection() {
  return <DeepParallaxHero />
}
```

### 2. Обновление карточек курсов
```typescript
// Замена существующих карточек на новые
// frontend/src/components/subjects/subject-card.tsx
import { Interactive3DCard } from '@/src/components/parallax/interactive-3d-card'

export function SubjectCard({ subject }) {
  return <Interactive3DCard subject={subject} />
}
```

### 3. Добавление интерактивного фона
```typescript
// Добавление в основной layout
// frontend/src/app/layout.tsx
import { InteractiveParticleBackground } from '@/src/components/particles/interactive-particle-background'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <InteractiveParticleBackground />
        {children}
      </body>
    </html>
  )
}
```

## 🚀 Преимущества новых эффектов

### 1. Глубокий параллакс
- **Визуальная глубина**: Создает ощущение трехмерного пространства
- **Плавные переходы**: Естественное движение элементов при скролле
- **Иммерсивный опыт**: Погружает пользователя в контент

### 2. Интерактивные 3D карточки
- **Реакция на взаимодействие**: Карточки реагируют на движение мыши
- **Современный вид**: Glassmorphism и градиенты создают премиальный вид
- **Улучшенный UX**: Интуитивное взаимодействие с курсами

### 3. Скролл-триггерные анимации
- **Плавное появление**: Элементы появляются при скролле
- **Стagger эффект**: Последовательное появление элементов
- **Производительность**: Оптимизированные анимации

### 4. Интерактивный фон
- **Динамические частицы**: Частицы реагируют на движение мыши
- **Соединения**: Визуальные связи между частицами
- **Нагрузка**: Оптимизированная производительность

---

**Визуальные эффекты готовы к интеграции!** 🎨✨