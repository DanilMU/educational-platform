# Структура проекта Frontend для образовательной платформы

## ТЕХНОЛОГИИ

- **Next.js 16** с TypeScript и App Router
- **React 19** с современными хуками
- **Tailwind CSS 4** для стилизации
- **Axios** для HTTP-запросов
- **React Query/TanStack Query** для управления состоянием и кэширования данных
- **React Hook Form** + **Zod** для форм валидации
- **Lucide React** для иконок
- **ShadCN/ui** или **Radix UI** для UI-компонентов
- **Framer Motion** для анимаций
- **React Hook Form** + **Zod** для форм валидации
- **Zustand** или **Jotai** для локального состояния управления

## ОСНОВНЫЕ МОДУЛИ

1. **Аутентификация** (вход, регистрация, восстановление пароля)
2. **Панель управления** (личный кабинет студента)
3. **Каталог курсов** (предметы и темы)
4. **Уроки** (просмотр материалов, видео, документы)
5. **Тесты и квизы** (прохождение тестов, проверка результатов)
6. **Прогресс обучения** (статистика, сертификаты)
7. **Профиль пользователя** (настройки, персональные данные)
8. **Административная панель** (для модераторов и администраторов)

## ЗАДАЧА

Создать полную файловую структуру проекта (дерево папок до 3-го уровня) с описанием назначения каждой директории. Включить:

- Модульную структуру Next.js App Router
- Конфигурационные файлы
- Компоненты для образовательной платформы
- API интеграцию с бэкендом
- Системы типов и валидации
- Адаптивный дизайн
- Оптимизацию производительности

Формат вывода: Markdown с деревом директорий и кратким описанием каждого файла/папки.

```mermaid
graph TD
    A[Frontend] --> B[public]
    A --> C[src]
    C --> D[app]
    C --> E[components]
    C --> F[api]
    C --> G[types]
    C --> H[lib]
    C --> I[data]
    C --> J[hooks]
    D --> K[auth]
    D --> L[courses]
    D --> M[lessons]
    D --> N[quizzes]
    D --> O[profile]
    D --> P[admin]
    E --> Q[ui]
    E --> R[auth]
    E --> S[courses]
    E --> T[lessons]
    E --> U[quizzes]
    E --> V[layout]
    F --> W[requests]
    F --> X[types]
    F --> Y[instance]
```

## ДЕТАЛЬНАЯ СТРУКТУРА ПРОЕКТА

```
frontend/
├── public/                           # Статические файлы (доступны напрямую)
│   ├── images/                       # Изображения и ассеты
│   │   ├── logo.svg                  # Логотип приложения
│   │   ├── favicon.ico               # Фавикон
│   │   └── icons/                    # SVG иконки
│   │       ├── book.svg
│   │       ├── certificate.svg
│   │       ├── user.svg
│   │       └── settings.svg
│   ├── fonts/                        # Шрифты
│   │   ├── inter/
│   │   └── roboto/
│   └── videos/                       # Видео файлы для уроков
│       ├── sample-lesson-1.mp4
│       └── intro.mp4

├── src/                              # Исходный код приложения
│   ├── app/                          # Next.js App Router (основная логика страниц)
│   │   ├── auth/                     # Страницы аутентификации
│   │   │   ├── login/page.tsx        # Страница входа
│   │   │   ├── register/page.tsx     # Страница регистрации
│   │   │   ├── reset-password/page.tsx # Страница восстановления пароля
│   │   │   └── verify-email/page.tsx # Страница подтверждения email
│   │   │
│   │   ├── courses/                  # Страницы каталога курсов
│   │   │   ├── page.tsx              # Главная страница каталога
│   │   │   ├── [id]/page.tsx         # Страница предмета
│   │   │   ├── [id]/topics/[topicId]/page.tsx # Страница темы
│   │   │   └── search/page.tsx       # Страница поиска курсов
│   │   │
│   │   ├── lessons/                  # Страницы уроков
│   │   │   ├── [id]/page.tsx         # Страница урока
│   │   │   ├── [id]/materials/page.tsx # Материалы урока
│   │   │   └── [id]/quiz/page.tsx    # Тест урока
│   │   │
│   │   ├── profile/                  # Страницы профиля
│   │   │   ├── page.tsx              # Личный кабинет
│   │   │   ├── settings/page.tsx     # Настройки профиля
│   │   │   ├── progress/page.tsx     # Прогресс обучения
│   │   │   └── certificates/page.tsx # Сертификаты
│   │   │
│   │   ├── admin/                    # Административная панель
│   │   │   ├── page.tsx              # Главная админки
│   │   │   ├── users/page.tsx        # Управление пользователями
│   │   │   ├── courses/page.tsx      # Управление курсами
│   │   │   ├── lessons/page.tsx      # Управление уроками
│   │   │   └── analytics/page.tsx    # Аналитика
│   │   │
│   │   ├── globals.css               # Глобальные стили
│   │   ├── layout.tsx                # Корневой layout (шапка, подвал)
│   │   ├── page.tsx                  # Главная страница (landing)
│   │   └── providers.tsx             # Провайдеры (React Query, Auth, Theme и т.д.)
│   │
│   ├── components/                   # Переиспользуемые компоненты
│   │   ├── ui/                       # UI-компоненты (ShadCN/ui или кастомные)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── accordion.tsx
│   │   │
│   │   ├── layout/                   # Глобальные элементы layout
│   │   │   ├── site-header.tsx       # Шапка сайта
│   │   │   ├── site-footer.tsx       # Подвал сайта
│   │   │   ├── sidebar.tsx           # Боковая панель
│   │   │   ├── breadcrumb.tsx        " Хлебные крошки
│   │   │   └── navigation.tsx        # Навигация
│   │   │
│   │   ├── auth/                     # Компоненты аутентификации
│   │   │   ├── auth-wrapper.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── reset-password-form.tsx
│   │   │   ├── social-auth-buttons.tsx
│   │   │   └── auth-guard.tsx
│   │   │
│   │   ├── courses/                  # Компоненты курсов
│   │   │   ├── course-card.tsx
│   │   │   ├── course-list.tsx
│   │   │   ├── course-progress.tsx
│   │   │   ├── course-rating.tsx
│   │   │   ├── course-sidebar.tsx
│   │   │   └── search-filters.tsx
│   │   │
│   │   ├── lessons/                  # Компоненты уроков
│   │   │   ├── lesson-player.tsx
│   │   │   ├── lesson-sidebar.tsx
│   │   │   ├── lesson-materials.tsx
│   │   │   ├── video-player.tsx
│   │   │   ├── document-viewer.tsx
│   │   │   └── lesson-progress.tsx
│   │   │
│   │   ├── quizzes/                  # Компоненты тестов
│   │   │   ├── quiz-question.tsx
│   │   │   ├── quiz-options.tsx
│   │   │   ├── quiz-result.tsx
│   │   │   ├── quiz-progress.tsx
│   │   │   └── quiz-timer.tsx
│   │   │
│   │   ├── profile/                  # Компоненты профиля
│   │   │   ├── profile-header.tsx
│   │   │   ├── profile-stats.tsx
│   │   │   ├── certificate-card.tsx
│   │   │   ├── progress-chart.tsx
│   │   │   └── settings-form.tsx
│   │   │
│   │   ├── admin/                    # Компоненты админки
│   │   │   ├── admin-layout.tsx
│   │   │   ├── user-table.tsx
│   │   │   ├── course-editor.tsx
│   │   │   ├── lesson-editor.tsx
│   │   │   └── analytics-dashboard.tsx
│   │   │
│   │   └── icons/                    # SVG-иконки
│   │       ├── course-icon.tsx
│   │       ├── lesson-icon.tsx
│   │       ├── quiz-icon.tsx
│   │       ├── certificate-icon.tsx
│   │       └── user-icon.tsx
│   │
│   ├── api/                          # Работа с API: запросы, хуки, типы
│   │   ├── hooks/                    # Кастомные хуки для запросов
│   │   │   ├── useAuth.ts            # Хук аутентификации
│   │   │   ├── useCourses.ts         # Хуки для работы с курсами
│   │   │   ├── useLessons.ts         # Хуки для работы с уроками
│   │   │   ├── useQuizzes.ts         # Хуки для работы с тестами
│   │   │   ├── useProgress.ts        # Хуки для прогресса
│   │   │   ├── useCertificates.ts    # Хуки для сертификатов
│   │   │   ├── useUsers.ts           # Хуки для пользователей
│   │   │   └── useAdmin.ts           # Хуки для админки
│   │   │
│   │   ├── requests/                 # Функции для отправки запросов
│   │   │   ├── auth.ts               # Аутентификация
│   │   │   ├── courses.ts            # Курсы
│   │   │   ├── lessons.ts            # Уроки
│   │   │   ├── quizzes.ts            # Тесты
│   │   │   ├── progress.ts           # Прогресс
│   │   │   ├── certificates.ts       # Сертификаты
│   │   │   ├── users.ts              # Пользователи
│   │   │   └── admin.ts              # Админка
│   │   │
│   │   ├── types/                    # Типы ответов и запросов API
│   │   │   ├── auth.ts               # Типы аутентификации
│   │   │   ├── course.ts             # Типы курсов
│   │   │   ├── lesson.ts             # Типы уроков
│   │   │   ├── quiz.ts               # Типы тестов
│   │   │   ├── progress.ts           # Типы прогресса
│   │   │   ├── certificate.ts        # Типы сертификатов
│   │   │   ├── user.ts               # Типы пользователей
│   │   │   └── index.ts              # Экспорт всех типов
│   │   │
│   │   └── instance.ts               # Axios-инстанс с настройками
│   │       # (базовый URL, interceptors, обработка ошибок)
│   │
│   ├── lib/                          # Вспомогательные утилиты
│   │   ├── utils.ts                  # Общие функции (форматирование, валидация)
│   │   ├── api.ts                    # API утилиты
│   │   ├── validation.ts             # Схемы валидации Zod
│   │   ├── constants.ts              # Константы приложения
│   │   ├── helpers.ts                # Вспомогательные функции
│   │   ├── storage.ts                # Работа с localStorage/sessionStorage
│   │   └── date.ts                   # Утилиты для работы с датами
│   │
│   ├── types/                        # Глобальные типы приложения
│   │   ├── user.ts                   # Типы пользователей
│   │   ├── course.ts                 # Типы курсов
│   │   ├── lesson.ts                 # Типы уроков
│   │   ├── quiz.ts                   # Типы тестов
│   │   ├── progress.ts               # Типы прогресса
│   │   ├── certificate.ts            # Типы сертификатов
│   │   ├── api.ts                    # Общие API типы
│   │   └── index.ts                  # Экспорт всех типов
│   │
│   ├── data/                         # Статические данные для UI
│   │   ├── subjects.ts               # Список предметов
│   │   ├── topics.ts                 # Список тем
│   │   ├── faq.ts                    # Вопросы и ответы
│   │   ├── navigation.ts             # Навигационные данные
│   │   └── index.ts                  # Экспорт всех данных
│   │
│   ├── hooks/                        # Глобальные хуки приложения
│   │   ├── useLocalStorage.ts        # Хук для localStorage
│   │   ├── useDebounce.ts            # Хук для debounce
│   │   ├── useOutsideClick.ts        # Хук для клика вне элемента
│   │   ├── useIntersectionObserver.ts # Хук для наблюдения за элементами
│   │   └── index.ts                  # Экспорт всех хуков
│   │
│   └── middleware.ts                 # Next.js Middleware
│       # (аутентификация, редиректы, обработка ролей)
│
├── .env.local                        # Локальные переменные окружения
├── .env.example                      # Пример файла окружения
├── next.config.ts                    # Конфигурация Next.js
├── package.json
├── tailwind.config.ts                # Конфигурация Tailwind CSS
├── tsconfig.json                     # Конфигурация TypeScript
├── postcss.config.mjs                # Конфигурация PostCSS
├── eslint.config.mjs                 # Конфигурация ESLint
├── prettier.config.mjs               # Конфигурация Prettier
└── README.md                         # Документация проекта
```

## ОПИСАНИЕ КЛЮЧЕВЫХ МОДУЛЕЙ

### 1. Аутентификация (`src/app/auth/`)
- **login/page.tsx**: Страница входа с формой аутентификации
- **register/page.tsx**: Страница регистрации нового пользователя
- **reset-password/page.tsx**: Форма восстановления пароля
- **verify-email/page.tsx**: Страница подтверждения email адреса

### 2. Каталог курсов (`src/app/courses/`)
- **page.tsx**: Главная страница каталога со списком всех предметов
- **[id]/page.tsx**: Страница конкретного предмета со списком тем
- **[id]/topics/[topicId]/page.tsx**: Страница темы со списком уроков
- **search/page.tsx**: Страница поиска фильтрации курсов

### 3. Уроки (`src/app/lessons/`)
- **[id]/page.tsx**: Страница урока с основным контентом
- **[id]/materials/page.tsx**: Страница с дополнительными материалами урока
- **[id]/quiz/page.tsx**: Страница теста по уроку

### 4. Профиль пользователя (`src/app/profile/`)
- **page.tsx**: Личный кабинет с основной информацией
- **settings/page.tsx**: Настройки профиля пользователя
- **progress/page.tsx**: Страница с прогрессом обучения
- **certificates/page.tsx**: Страница с загруженными сертификатами

### 5. Административная панель (`src/app/admin/`)
- **page.tsx**: Главная страница админки
- **users/page.tsx**: Управление пользователями
- **courses/page.tsx**: Управление курсами и уроками
- **analytics/page.tsx**: Аналитика и статистика

### 6. Компоненты (`src/components/`)
- **ui/**: Базовые UI компоненты (кнопки, инпуты, карточки и т.д.)
- **layout/**: Компоненты layout (шапка, подвал, навигация)
- **auth/**: Компоненты для аутентификации
- **courses/**: Компоненты для работы с курсами
- **lessons/**: Компоненты для уроков
- **quizzes/**: Компоненты для тестов
- **profile/**: Компоненты для профиля
- **admin/**: Компоненты для административной панели

### 7. API интеграция (`src/api/`)
- **hooks/**: Кастомные хуки для работы с API
- **requests/**: Функции для отправки HTTP запросов
- **types/**: Типы данных для API запросов и ответов
- **instance.ts**: Настройка Axios инстанса

### 8. Утилиты и типы (`src/lib/`, `src/types/`)
- **utils.ts**: Вспомогательные функции
- **validation.ts**: Схемы валидации Zod
- **constants.ts**: Константы приложения
- **types/**: Глобальные типы TypeScript

## КОНФИГУРАЦИОННЫЕ ФАЙЛЫ

### `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'your-backend-domain.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
```

### `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

## ЗАВИСИМОСТИ В PACKAGE.JSON

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "16.0.1",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.552.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "react-intersection-observer": "^9.5.0",
    "react-use": "^17.4.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.0.1",
    "prettier": "^3.6.2",
    "@trivago/prettier-plugin-sort-imports": "^6.0.0",
    "prettier-plugin-tailwindcss": "^0.7.1"
  }
}
```

## ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

### `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Образовательная платформа
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `.env.example`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Образовательная платформа
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/educational_platform
JWT_SECRET=your-super-secret-jwt-key
```

## ЗАКЛЮЧЕНИЕ

Эта структура обеспечивает:

1. **Модульную архитектуру** с четким разделением ответственности
2. **Масштабируемость** за счет компонентного подхода
3. **Типизацию** на всех уровнях для надежности кода
4. **Оптимизацию производительности** с помощью React Query и кэширования
5. **Удобство разработки** с современными инструментами и best practices
6. **Адаптивность** под образовательную платформу с учетом всех специфических модулей

Структура готова к реализации и может быть легко расширена при необходимости добавления новых функциональных возможностей.