
# Анализ и план реализации Backend для Образовательного Портала

## 1. Текущее состояние проекта

Проект `backend` представляет собой активно разрабатываемый сервис на NestJS.

**Что уже есть:**
- **Основа NestJS:** Установлены и настроены основные зависимости.
- **База данных:** Настроен `docker-compose.yml` для запуска PostgreSQL.
- **ORM:** Интегрирована Prisma, в `prisma/schema.prisma` определены все модели данных.
- **Модуль аутентификации (`auth`):** Реализована регистрация, вход, JWT-стратегия и защитный guard.
- **Модуль пользователей (`users`):** Создана основа модуля (сервис, контроллер).
- **Конфигурация:** Настроены `ConfigModule`, CORS, Swagger.
- **Инструменты:** Настроены TypeScript, ESLint, Prettier и Jest.

**Чего не хватает:**
- **Модуль пользователей (`users`):** Необходимо завершить реализацию, добавив DTO.
- **Модули прогресса и сертификатов:** `progress` и `certificates` отсутствуют.
- **Вспомогательные модули:** `files` (для загрузки файлов) и `notifications` (для уведомлений) не реализованы.
- **Тестирование:** Юнит- и e2e-тесты для существующей бизнес-логики не написаны.

---

## 2. План реализации на основе `roadmap(back).toml`

Ниже представлена полная структура проекта, которую необходимо реализовать, и детальный план по каждому модулю.

### 2.1. Предлагаемая файловая структура
```
backend/
├── prisma/
│   └── schema.prisma                 # Схема данных Prisma (модели, отношения)
├── src/
│   ├── app.module.ts                 # Главный модуль приложения
│   ├── main.ts                       # Точка входа в приложение
│   │
│   ├── api/
│   │   ├── api.module.ts             # Корневой модуль API
│   │   ├── auth/                     # Модуль аутентификации
│   │   │   ├── auth.controller.ts    # Контроллер аутентификации
│   │   │   ├── auth.module.ts        # Модуль аутентификации
│   │   │   ├── auth.service.ts       # Сервис аутентификации
│   │   │   ├── dto/                  # DTO для аутентификации
│   │   │   │   ├── login.dto.ts      # DTO для логина
│   │   │   │   ├── register.dto.ts   # DTO для регистрации
│   │   │   │   └── index.ts          # Экспорт DTO
│   │   │   └── interfaces/           # Интерфейсы для аутентификации
│   │   │       └── jwt.interface.ts  # Интерфейс JWT полезной нагрузки
│   │   │
│   │   └── users/                    # Модуль пользователей
│   │       ├── dto/                  # DTO для пользователей
│   │       │   ├── get-me.dto.ts
│   │       │   ├── update-auto-renewal.dto.ts
│   │       │   └── index.ts
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   │
│   ├── common/                       # Общие утилиты, декораторы, гварды
│   │   ├── decorators/               # Декораторы
│   │   │   ├── authorized.decorator.ts
│   │   │   ├── protected.decorator.ts
│   │   │   └── index.ts
│   │   ├── guards/                   # Гварды (JWT, Roles)
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── index.ts
│   │   ├── strategies/               # Стратегии Passport.js (JWT)
│   │   │   └── jwt.strategy.ts
│   │   └── utils/                    # Утилиты
│   │       ├── is-dev.util.ts
│   │       └── ms.util.ts
│   │
│   ├── config/                       # Конфигурация приложения
│   │   ├── cors.config.ts
│   │   ├── jwt.config.ts
│   │   ├── swagger.config.ts
│   │   └── index.ts
│   │
│   ├── infra/                        # Инфраструктура (Prisma, Redis и т.д.)
│   │   ├── prisma/                   # Prisma
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── infra.module.ts
│   │
│   ├── subjects/               # Модуль предметов
│   │   ├── subjects.module.ts
│   │   ├── subjects.controller.ts
│   │   ├── subjects.service.ts
│   │   └── dto/
│   │
│   ├── topics/                 # Модуль тем
│   │   ├── topics.module.ts
│   │   ├── topics.controller.ts
│   │   ├── topics.service.ts
│   │   └── dto/
│   │
│   ├── lessons/                # Модуль уроков
│   │   ├── lessons.module.ts
│   │   ├── lessons.controller.ts
│   │   ├── lessons.service.ts
│   │   └── dto/
│   │
│   ├── quizzes/                # Модуль тестов
│   │   ├── quizzes.module.ts
│   │   ├── quizzes.controller.ts
│   │   ├── quizzes.service.ts
│   │   └── dto/
│   │
│   ├── progress/               # Модуль прогресса
│   │   ├── progress.module.ts
│   │   ├── progress.controller.ts
│   │   ├── progress.service.ts
│   │   └── dto/
│   │
│   ├── certificates/           # Модуль сертификатов
│   │   ├── certificates.module.ts
│   │   ├── certificates.controller.ts
│   │   ├── certificates.service.ts
│   │   └── dto/
│   │
│   ├── files/                  # Модуль для работы с файлами
│   │   ├── files.module.ts
│   │   ├── files.service.ts
│   │   └── files.controller.ts
│   │
│   └── notifications/          # Модуль уведомлений
│       ├── notifications.module.ts
│       └── notifications.service.ts
│
└── test/
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

### 2.2. Задачи по модулям

#### **Шаг 1: Настройка Prisma Schema**
- [x] **Задача:** В `prisma/schema.prisma` определить все модели данных: `User`, `Subject` (с необязательным `description`), `Topic`, `Lesson`, `Quiz`, `Question`, `Answer`, `UserProgress`, `Certificate`.

#### **Шаг 2: Модуль аутентификации (`auth`)**
- **Зависимости:** `nestjs/jwt`, `nestjs/passport`, `passport`, `passport-jwt`, `argon2`.
- **Реализация:**
    - [x] `auth.service.ts`: Логика регистрации, входа, валидации пользователя.
    - [x] `auth.controller.ts`: Endpoints для `/login`, `/register`.
    - [x] `strategies/jwt.strategy.ts`: Валидация JWT токена.
    - [x] `guards/jwt-auth.guard.ts`: Guard для защиты роутов.
    - [x] `auth.service.ts`: Реализовать обновление токенов (refresh token).
    - [x] `auth.controller.ts`: Добавить endpoint для `/refresh`.
    - [x] `guards/roles.guard.ts`: Guard для проверки ролей.

#### **Шаг 3: Модуль пользователей (`users`)**
- **Реализация:**
    - [x] `users.service.ts`: CRUD операции для пользователей.
    - [x] `users.controller.ts`: Endpoints для управления пользователями.
    - [x] `dto/`: DTO для создания и обновления пользователя.

#### **Шаг 4: Основные учебные модули (`subjects`, `topics`, `lessons`, `quizzes`)**
- [x] **Реализация:** Для каждого модуля созданы `controller`, `service`, `module` и `dto`.
- [x] **Отношения:** Настроены связи между модулями в `prisma/schema.prisma`.
- [x] **Логика:** Реализованы CRUD-операции для всех модулей, включая полную логику `update` для `quizzes`.
- [x] **`lessons`:** Сервис поддерживает сохранение rich text (HTML) в строковом поле.
- [x] **`quizzes`:** Сервис обрабатывает разные типы вопросов, реализована логика проверки тестов.

#### **Шаг 5: Прогресс и сертификаты (`progress`, `certificates`)**
- [x] **`progress.service.ts`:** Логика для отслеживания прохождения уроков и тестов.
- [ ] **`certificates.service.ts`:**
    - **Зависимость:** `pdf-lib` или `puppeteer` для генерации PDF.
    - **Логика:** Генерация PDF-сертификата по завершении предмета.

---

# План улучшения Backend для Образовательного Портала

## 1. Обновление сущностей (Entities)

### 1.1. Обновление Lesson Entity
- [x] Добавлены новые поля в сущность Lesson:
  - `estimatedTime` - ориентировочное время прохождения урока
  - `difficulty` - сложность урока (1-5)
  - `learningObjectives` - цели обучения
  - `prerequisites` - требования для прохождения
  - `videoUrl` - ссылка на видеоурок
  - `attachments` - список вложений
  - `order` - порядковый номер урока в теме

### 1.2. Создание новых сущностей
- [x] Создание сущности `LessonDescriptionDto` для детального описания урока
- [x] Создание сущности `PrerequisitesDto` для списка предшествующих уроков
- [x] Создание сущности `LearningPathDto` для структуры пути обучения
- [x] Создание сущности `RecommendationsDto` для рекомендаций
- [x] Создание сущности `AnalyticsDto` для различных метрик аналитики
- [x] Создание сущности `NotificationDto` для уведомлений

## 2. Создание новых DTO

### 2.1. DTO для описания уроков
- [x] `LessonDescriptionDto` - для детального описания урока
- [x] `PrerequisitesDto` - для списка предшествующих уроков
- [x] `LearningPathDto` - для структуры пути обучения

### 2.2. DTO для системы рекомендаций
- [x] `RecommendationsDto` - для рекомендаций следующих уроков

### 2.3. DTO для аналитики обучения
- [x] `AnalyticsDto` - для различных метрик аналитики
- [x] `UserProgressAnalyticsDto` - для аналитики прогресса пользователя
- [x] `CourseAnalyticsDto` - для аналитики курса

### 2.4. DTO для системы уведомлений
- [x] `NotificationDto` - для уведомлений

## 3. Новые API endpoints

### 3.1. Для описания уроков
- [x] `GET /lessons/:id/description` - детальное описание урока с целями обучения и требованиями
- [x] `GET /lessons/:id/prerequisites` - список уроков, которые нужно пройти перед текущим
- [x] `GET /subjects/:id/learning-path` - полный путь обучения по курсу с зависимостями

### 3.2. Для системы рекомендаций
- [x] `POST /users/:id/recommendations` - рекомендации следующих уроков на основе прогресса
- [x] `GET /users/:id/learning-analytics` - статистика обучения: время, прогресс, сильные/слабые стороны

### 3.3. Для аналитики обучения
- [x] `GET /analytics/user/:id/progress` - прогресс пользователя
- [x] `GET /analytics/user/:id/time-spent` - время, потраченное на обучение
- [x] `GET /analytics/user/:id/success-rate` - успешность прохождения тестов
- [x] `GET /analytics/course/:id/popular-lessons` - популярные уроки в курсе

### 3.4. Для системы уведомлений
- [x] `POST /notifications/lesson-completed` - уведомление о завершении урока
- [x] `POST /notifications/quiz-result` - уведомление с результатами теста
- [x] `POST /notifications/recommendation` - уведомление с рекомендациями

## 4. Архитектурные улучшения

### 4.1. Новые сервисы
- [x] `RecommendationsService` - логика рекомендаций на основе прогресса
- [x] `AnalyticsService` - расчет и предоставление статистики обучения
- [x] `NotificationsService` - отправка уведомлений пользователям
- [x] `LearningPathService` - построение путей обучения

### 4.2. Модификация существующих сервисов
- [x] `LessonsService` - добавить методы для работы с новыми полями
- [x] `ProgressService` - расширить функционал для аналитики
- [x] `SubjectsService` - добавить методы для работы с путями обучения

## 5. Бизнес-логика

### 5.1. Система рекомендаций
- [x] Анализ прогресса пользователя
- [x] Учет сложности уроков
- [x] Рекомендация следующих уроков на основе успешности
- [x] Логика ветвления обучения

### 5.2. Аналитика обучения
- [x] Расчет общего прогресса
- [x] Анализ времени, потраченного на уроки
- [x] Статистика успешности тестов
- [x] Выявление сильных и слабых сторон

### 5.3. Уведомления
- [x] Событийно-ориентированная архитектура
- [x] Различные типы уведомлений
- [ ] Настройка частоты отправки

## 6. Безопасность и производительность

### 6.1. Безопасность
- [x] Валидация всех новых DTO
- [x] Проверка прав доступа к аналитике
- [x] Защита от спама уведомлениями

### 6.2. Производительность
- [x] Кэширование результатов рекомендаций
- [x] Оптимизация запросов для аналитики
- [x] Асинхронная отправка уведомлений

## 7. Тестирование

### 7.1. Unit тесты
- [ ] Тесты бизнес-логики рекомендаций
- [x] Тесты расчета аналитики
- [ ] Тесты валидации DTO

### 7.2. Integration тесты
- [ ] Тесты новых API endpoints
- [ ] Тесты взаимодействия сервисов
- [ ] Тесты работы с базой данных

## 8. Документация

### 8.1. Обновление документации
- [x] Документация новых API endpoints
- [ ] Обновление схемы базы данных
- [ ] Руководство по использованию новых функций
