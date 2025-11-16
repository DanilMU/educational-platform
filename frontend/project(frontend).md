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
│   │   ├── logo/                     # Логотипы в разных размерах
│   │   │   ├── logo-light.svg
│   │   │   ├── logo-dark.svg
│   │   │   └── logo-icon.svg
│   │   ├── favicon/                  # Фавиконы для разных устройств
│   │   │   ├── favicon.ico
│   │   │   ├── apple-touch-icon.png
│   │   │   └── manifest.json
│   │   ├── illustrations/            # Иллюстрации для страниц
│   │   │   ├── empty-state.svg
│   │   │   ├── success.svg
│   │   │   ├── error.svg
│   │   │   └── onboarding.svg
│   │   ├── avatars/                  # Аватары пользователей
│   │   └── course-covers/            # Обложки курсов
│   ├── fonts/                        # Шрифты
│   │   ├── inter/                    # Основной шрифт
│   │   └── roboto-mono/              # Моноширинный шрифт для кода
│   ├── videos/                       # Видео файлы для уроков
│   │   ├── previews/                 # Превью видео
│   │   └── sample/
│   └── robots.txt                    # SEO инструкции для поисковиков
│   └── sitemap.xml                   # Карта сайта (генерируется динамически)

├── src/
│   ├── app/                          # Next.js App Router (основная логика страниц)
│   │   ├── (auth)/                   # Группа маршрутов для аутентификации
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Страница входа
│   │   │   ├── register/
│   │   │   │   └── page.tsx          # Страница регистрации
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx          # Восстановление пароля
│   │   │   └── layout.tsx            # Layout для аутентификации
│   │   │
│   │   ├── (main)/                   # Основная группа маршрутов
│   │   │   ├── courses/              # Каталог курсов
│   │   │   │   ├── page.tsx          # Главная страница каталога
│   │   │   │   ├── [subjectId]/
│   │   │   │   │   ├── page.tsx      # Страница предмета
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── [subjectId]/topics/[topicId]/
│   │   │   │   │   ├── page.tsx      # Страница темы
│   │   │   │   │   └── components/   # Компоненты страницы темы
│   │   │   │   └── search/
│   │   │   │       └── page.tsx      # Поиск курсов
│   │   │   │
│   │   │   ├── lessons/              # Уроки
│   │   │   │   ├── [lessonId]/
│   │   │   │   │   ├── page.tsx      # Основной контент урока
│   │   │   │   │   ├── materials/
│   │   │   │   │   │   └── page.tsx  # Дополнительные материалы
│   │   │   │   │   ├── quiz/
│   │   │   │   │   │   └── page.tsx  # Тест по уроку
│   │   │   │   │   └── layout.tsx
│   │   │   │   └── components/       # Общие компоненты для уроков
│   │   │   │
│   │   │   ├── dashboard/            # Личный кабинет
│   │   │   │   ├── page.tsx          # Главная страница дашборда
│   │   │   │   ├── progress/
│   │   │   │   │   └── page.tsx      # Прогресс обучения
│   │   │   │   ├── certificates/
│   │   │   │   │   └── page.tsx      # Сертификаты
│   │   │   │   └── achievements/     # Достижения
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── profile/              # Профиль пользователя
│   │   │   │   ├── page.tsx          # Основная информация
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx      # Настройки профиля
│   │   │   │   │   ├── security/
│   │   │   │   │   │   └── page.tsx  # Настройки безопасности
│   │   │   │   │   └── notifications/
│   │   │   │   │       └── page.tsx  # Уведомления
│   │   │   │   └── components/
│   │   │   │
│   │   │   ├── admin/                # Административная панель
│   │   │   │   ├── layout.tsx        # Layout админки
│   │   │   │   ├── page.tsx          # Главная админки
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx      # Управление пользователями
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx      # Управление курсами
│   │   │   │   │   └── editor/       # Редактор курса
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx      # Аналитика
│   │   │   │   └── components/       # Компоненты админки
│   │   │   │
│   │   │   ├── layout.tsx            # Основной layout приложения
│   │   │   ├── page.tsx              # Главная страница (landing)
│   │   │   └── loading.tsx           # Скелетон загрузки
│   │   │
│   │   ├── (marketing)/              # Маркетинговые страницы
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # О платформе
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx          # Цены
│   │   │   ├── blog/                 # Блог
│   │   │   └── contact/
│   │   │       └── page.tsx          # Контакты
│   │   │
│   │   ├── api/                      # API маршруты Next.js
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/route.ts # NextAuth.js
│   │   │   └── webhooks/
│   │   │       └── route.ts          # Вебхуки
│   │   │
│   │   ├── providers/                # Провайдеры контекста
│   │   │   ├── theme-provider.tsx    # Тема (светлая/темная)
│   │   │   ├── auth-provider.tsx     # Аутентификация
│   │   │   ├── query-provider.tsx    # React Query
│   │   │   └── index.tsx             # Все провайдеры вместе
│   │   │
│   │   ├── styles/                   # Стили страниц
│   │   │   ├── globals.css           # Глобальные стили
│   │   │   ├── theme.css             # Темизация
│   │   │   └── animations.css        # CSS анимации
│   │   │
│   │   └── error.tsx                 # Глобальный обработчик ошибок
│   │   └── not-found.tsx             # Страница 404
│   │
│   ├── components/                   # Переиспользуемые компоненты
│   │   ├── ui/                       # UI-компоненты (ShadCN/ui)
│   │   │   ├── button/               # Кнопки разных типов
│   │   │   │   ├── index.tsx
│   │   │   │   ├── variants.ts       # Варианты кнопок
│   │   │   │   └── animated-button.tsx # Анимированная кнопка
│   │   │   ├── card/                 # Карточки
│   │   │   │   ├── course-card.tsx
│   │   │   │   ├── lesson-card.tsx
│   │   │   │   └── stat-card.tsx
│   │   │   ├── input/                # Инпуты
│   │   │   │   ├── search-input.tsx
│   │   │   │   └── password-input.tsx
│   │   │   ├── navigation/           # Навигационные компоненты
│   │   │   │   ├── sidebar.tsx       # Боковая панель
│   │   │   │   ├── top-nav.tsx       # Верхняя навигация
│   │   │   │   └── mobile-nav.tsx    # Мобильное меню
│   │   │   ├── feedback/             # Компоненты обратной связи
│   │   │   │   ├── toast.tsx         # Уведомления
│   │   │   │   ├── alert.tsx         # Алерты
│   │   │   │   └── loading-spinner.tsx # Спиннер загрузки
│   │   │   └── data-display/         # Отображение данных
│   │   │       ├── progress-bar.tsx
│   │   │       ├── rating.tsx
│   │   │       └── chart/
│   │   │           ├── line-chart.tsx
│   │   │           └── pie-chart.tsx
│   │   │
│   │   ├── layout/                   # Макеты и контейнеры
│   │   │   ├── main-layout.tsx       # Основной макет
│   │   │   ├── auth-layout.tsx       # Макет для аутентификации
│   │   │   ├── dashboard-layout.tsx  # Макет для дашборда
│   │   │   ├── container.tsx         # Контейнер с отступами
│   │   │   └── hero-section.tsx      # Герой секция для landing
│   │   │
│   │   ├── course/                   # Компоненты для курсов
│   │   │   ├── course-preview.tsx
│   │   │   ├── topic-list.tsx
│   │   │   ├── lesson-grid.tsx
│   │   │   ├── course-progress.tsx
│   │   │   └── course-header.tsx
│   │   │
│   │   ├── lesson/                   # Компоненты для уроков
│   │   │   ├── video-player.tsx      # Плеер с поддержкой HLS
│   │   │   ├── content-editor.tsx    # Редактор контента (для админа)
│   │   │   ├── material-list.tsx
│   │   │   ├── quiz-player.tsx       # Прохождение теста
│   │   │   └── lesson-timer.tsx
│   │   │
│   │   ├── auth/                     # Компоненты аутентификации
│   │   │   ├── auth-form.tsx
│   │   │   ├── social-login.tsx
│   │   │   └── auth-modal.tsx        # Модальное окно для аутентификации
│   │   │
│   │   ├── dashboard/                # Компоненты дашборда
│   │   │   ├── stats-overview.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   ├── learning-path.tsx
│   │   │   └── certificate-preview.tsx
│   │   │
│   │   ├── admin/                    # Компоненты админки
│   │   │   ├── data-table.tsx        # Таблица с пагинацией
│   │   │   ├── form-builder.tsx      # Конструктор форм
│   │   │   ├── user-management.tsx
│   │   │   └── course-builder.tsx
│   │   │
│   │   ├── common/                   # Общие компоненты
│   │   │   ├── header.tsx            # Шапка сайта
│   │   │   ├── footer.tsx            # Подвал сайта
│   │   │   ├── breadcrumb.tsx        # Хлебные крошки
│   │   │   ├── search-bar.tsx
│   │   │   └── dark-mode-toggle.tsx  # Переключатель темы
│   │   │
│   │   └── animations/               # Анимационные компоненты
│   │       ├── fade-in.tsx           # Плавное появление
│   │       ├── slide-in.tsx          # Появление с эффектом слайда
│   │       └── staggered-list.tsx    # Последовательное появление списка
│   │
│   ├── hooks/                        # Кастомные хуки
│   │   ├── auth/                     # Хуки аутентификации
│   │   │   ├── use-auth.ts
│   │   │   ├── use-session.ts
│   │   │   └── use-protected-route.ts
│   │   ├── data/                     # Хуки для данных
│   │   │   ├── use-courses.ts
│   │   │   ├── use-lessons.ts
│   │   │   ├── use-progress.ts
│   │   │   └── use-certificates.ts
│   │   ├── ui/                       # UI хуки
│   │   │   ├── use-toast.ts
│   │   │   ├── use-mobile.ts         # Определение мобильного устройства
│   │   │   ├── use-scroll.ts         # Хук прокрутки
│   │   │   └── use-theme.ts          # Управление темой
│   │   └── utils/                    # Утилитарные хуки
│   │       ├── use-debounce.ts
│   │       ├── use-local-storage.ts
│   │       └── use-outside-click.ts
│   │
│   ├── lib/                          # Библиотеки и утилиты
│   │   ├── api/                      # API клиент
│   │   │   ├── client.ts             # Axios инстанс
│   │   │   ├── endpoints.ts          # URL эндпоинтов
│   │   │   └── interceptors.ts       # Обработка ошибок и токенов
│   │   ├── auth/                     # Аутентификация
│   │   │   ├── jwt.ts                # Работа с JWT
│   │   │   └── session.ts            # Управление сессией
│   │   ├── validation/               # Валидация
│   │   │   ├── schemas.ts            # Zod схемы
│   │   │   └── validators.ts         # Функции валидации
│   │   ├── utils/                    # Утилиты
│   │   │   ├── date.ts               # Работа с датами
│   │   │   ├── format.ts             # Форматирование данных
│   │   │   ├── storage.ts            # Работа с localStorage
│   │   │   └── string.ts             # Строковые операции
│   │   ├── constants/                # Константы
│   │   │   ├── routes.ts             # Роуты приложения
│   │   │   ├── roles.ts              # Роли пользователей
│   │   │   └── colors.ts             # Цветовая палитра
│   │   └── services/                 # Сервисы
│   │       ├── course-service.ts
│   │       ├── lesson-service.ts
│   │       └── user-service.ts
│   │
│   ├── types/                        # TypeScript типы
│   │   ├── api/                      # Типы API
│   │   │   ├── auth.ts
│   │   │   ├── course.ts
│   │   │   ├── lesson.ts
│   │   │   ├── quiz.ts
│   │   │   └── user.ts
│   │   ├── app/                      # Типы приложения
│   │   │   ├── theme.ts
│   │   │   ├── layout.ts
│   │   │   └── navigation.ts
│   │   └── index.ts                  # Экспорт всех типов
│   │
│   ├── config/                       # Конфигурации
│   │   ├── site.ts                   # Конфигурация сайта
│   │   ├── seo.ts                    # SEO настройки
│   │   └── features.ts               # Фичи приложения
│   │
│   ├── styles/                       # Глобальные стили
│   │   ├── base/                     # Базовые стили
│   │   │   ├── reset.css             # CSS reset
│   │   │   └── typography.css        # Типографика
│   │   ├── components/               # Стили компонентов
│   │   ├── utilities/                # Утилитарные классы
│   │   └── animations/               # CSS Keyframes
│   │
│   ├── utils/                        # Вспомогательные функции
│   │   ├── cn.ts                     # Объединение классов (clsx + tailwind-merge)
│   │   ├── generate-id.ts            # Генерация ID
│   │   └── platform.ts               # Определение платформы
│   │
│   └── middleware.ts                 # Next.js Middleware (аутентификация, редиректы)
│
├── .github/                          # GitHub конфигурация
│   └── workflows/                    # CI/CD пайплайны
│       ├── deploy.yml                # Деплой на Vercel
│       └── test.yml                  # Запуск тестов
│
├── .vscode/                          # VSCode настройки
│   ├── extensions.json               # Рекомендуемые расширения
│   ├── settings.json                 # Настройки редактора
│   └── launch.json                   # Конфигурация отладки
│
├── tests/                            # Тесты
│   ├── unit/                         # Юнит-тесты
│   ├── integration/                  # Интеграционные тесты
│   └── e2e/                          # End-to-end тесты
│
├── .env.local                        # Локальные переменные окружения
├── .env.example                      # Пример файла окружения
├── next.config.ts                    # Конфигурация Next.js
├── tailwind.config.ts                # Конфигурация Tailwind CSS
├── tsconfig.json                     # Конфигурация TypeScript
├── postcss.config.mjs                # Конфигурация PostCSS
├── eslint.config.mjs                 # Конфигурация ESLint
├── prettier.config.mjs               # Конфигурация Prettier
├── vercel.json                       # Конфигурация Vercel
└── README.md                         # Документация проекта
```

## ОПИСАНИЕ КЛЮЧЕВЫХ МОДУЛЕЙ

### 1. Аутентификация (`src/app/auth/`)
- **login/page.tsx**: Страница входа с формой аутентификации
- **register/page.tsx**: Страница регистрации нового пользователя
- **reset-password/page.tsx**: Форма восстановления пароля
- **verify-email/page.tsx**: TODO: Страница подтверждения email адреса (требует backend реализации)

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

8. Рекомендации по использованию:
@basecn/ui для основных UI компонентов - минималистичный дизайн, хорошая производительность
@magicui для анимаций - плавные переходы, оптимизированная производительность
Кастомные компоненты для специфичных нужд образовательной платформы
Context API для управления состоянием между компонентами
React Query для серверного состояния и кэширования
Zustand для локального состояния управления