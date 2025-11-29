
# Рекомендации по библиотекам для образовательной платформы

## 🎯 Выбор библиотек из .gemini/registries.json

### Основные рекомендации для образовательной платформы

#### 1. @magicui - для анимаций и эффектов
**Приоритет: Высокий**
```json
{
  "@magicui": "https://magicui.design/r/{name}.json"
}
```
**Почему подходит:**
- Современные анимированные компоненты
- Поддержка Framer Motion
- Идеально для образовательного контента
- Легкая интеграция с Tailwind CSS

**Рекомендуемые компоненты:**
- `MagicCard` - для карточек курсов
- `MagicButton` - для интерактивных кнопок
- `MagicInput` - для форм
- `AnimatedList` - для списков уроков

#### 2. @aceternity - для высококачественных UI компонентов
**Приоритет: Высокий**
```json
{
  "@aceternity": "https://ui.aceternity.com/registry/{name}.json"
}
```
**Почему подходит:**
- Профессиональный дизайн
- Анимированные текстовые эффекты
- 3D компоненты
- Идеально для Hero секций

**Рекомендуемые компоненты:**
- `TypingAnimation` - для заголовков
- `Spotlight` - для выделения контента
- `AnimatedList` - для интерактивных списков
- `3D Card` - для карточек курсов

#### 3. @originui - для современного дизайна
**Приоритет: Средний**
```json
{
  "@originui": "https://originui.com/r/{name}.json"
}
```
**Почему подходит:**
- Полный набор компонентов
- Современный дизайн
- Хорошая документация
- Поддержка темной темы

**Рекомендуемые компоненты:**
- Charts - для графиков прогресса
- Forms - для форм админки
- Tables - для таблиц данных
- Layouts - для раскладок

#### 4. @cult-ui - для профессионального интерфейса
**Приоритет: Средний**
```json
{
  "@cult-ui": "https://cult-ui.com/r/{name}.json"
}
```
**Почему подходит:**
- Дизайн, ориентированный на пользователя
- Компоненты для дашбордов
- Анимации и переходы
- Адаптивный дизайн

**Рекомендуемые компоненты:**
- Dashboard - для админки
- Charts - для аналитики
- Forms - для форм
- Tables - для управления данными

#### 5. @basecn - для минималистичного дизайна
**Приоритет: Низкий**
```json
{
  "@basecn": "https://basecn.dev/r/{name}.json"
}
```
**Почему подходит:**
- Минималистичный дизайн
- Легковесные компоненты
- Хорошая производительность
- Простая интеграция

**Рекомендуемые компоненты:**
- Buttons - для кнопок
- Cards - для карточек
- Forms - для форм
- Layouts - для раскладок

#### 6. @rigidui - для строгого дизайна
**Приоритет: Низкий**
```json
{
  "@rigidui": "https://rigidui.com/r/{name}.json"
}
```
**Почему подходит:**
- Строгий, профессиональный дизайн
- Компоненты для бизнес-приложений
- Хорошая типографика
- Стабильность

**Рекомендуемые компоненты:**
- Forms - для форм админки
- Tables - для таблиц
- Charts - для графиков
- Layouts - для раскладок

## 🚀 Интеграция библиотек

### Шаг 1: Обновление package.json

```json
{
  "dependencies": {
    // Существующие зависимости
    "@magicui/ui": "^0.1.0",
    "@aceternity-ui/react": "^1.0.0",
    "@originui/react": "^2.0.0",
    "@cult-ui/react": "^1.5.0",
    "@basecn/react": "^1.0.0",
    "@rigidui/react": "^1.2.0",
    
    // Дополнительные зависимости для улучшений
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

### Шаг 2: Настройка Tailwind CSS

```javascript
// frontend/tailwind.config.mjs
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
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
```

### Шаг 3: Создание компонентов

#### Улучшенный Hero компонент

```typescript
// frontend/src/components/home/hero-section-enhanced.tsx
'use client'

import { motion } from 'framer-motion'
import { TypingAnimation } from '@aceternity-ui/react-typing-animation'
import { Spotlight } from '@aceternity-ui/react-spotlight'
import { MagicButton } from '@magicui/react-button'
import Link from 'next/link'

export function HeroSectionEnhanced() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый эффект */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Spotlight эффект */}
      <Spotlight
        className="absolute inset-0 z-10"
        fill="white"
        blur="2xl"
        radius="60%"
      />
      
      {/* Основной контент */}
      <div className="relative z-20 mx-auto max-w-4xl text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TypingAnimation
            text="Добро пожаловать на Образовательную платформу"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
          >
            Раскройте свой потенциал с интерактивными курсами, созданными для эффективного обучения
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagicButton
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link href="/auth/register">Начать обучение</Link>
            </MagicButton>
            
            <MagicButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/subjects">Просмотреть курсы</Link>
            </MagicButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

#### Улучшенная карточка курса

```typescript
// frontend/src/components/subjects/subject-card-enhanced.tsx
'use client'

import { motion } from 'framer-motion'
import { Card3D } from '@/src/components/parallax/3d-card'
import { MagicCard } from '@magicui/react-card'
import { Progress } from '@/src/components/ui/progress'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { BookOpen, ArrowRight, Star, Clock } from 'lucide-react'
import Link from 'next/link'

interface SubjectCardEnhancedProps {
  subject: {
    id: string
    title: string
    description: string
    progress?: number
    lessons?: number
    category?: string
    rating?: number
    duration?: string
  }
}

export function SubjectCardEnhanced({ subject }: SubjectCardEnhancedProps) {
  const description = (subject.description || '').length > 120
    ? (subject.description || '').slice(0, 120) + '...'
    : (subject.description || '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card3D className="h-full">
        <MagicCard
          className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20"
          gradientSize={200}
          gradientColor="#3b82f6"
          gradientOpacity={0.3}
        >
          <div className="relative h-full flex flex-col">
            {/* Заголовок с иконкой */}
            <div className="flex items-start gap-4 p-6 pb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {subject.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {subject.category && (
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {subject.category}
                    </Badge>
                  )}
                  {subject.rating && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white text-sm">{subject.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Контент */}
            <div className="flex-grow px-6 pb-4">
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {description}
              </p>
              
              {subject.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Прогресс</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 bg-white/20" />
                </div>
              )}

              {subject.lessons && (
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{subject.lessons} уроков</span>
                  </div>
                  {subject.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{subject.duration}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Футер */}
            <div className="px-6 pb-6">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
              >
                <Link href={`/subjects/${subject.id}`}>
                  Продолжить обучение
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </MagicCard>
      </Card3D>
    </motion.div>
  )
}
```

####