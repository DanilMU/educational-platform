# Backend - Логика для описания уроков и процесса обучения

## Текущее состояние
- **Бэкенд**: NestJS с Prisma ORM, PostgreSQL
- **Аутентификация**: JWT токены, роли (STUDENT, ADMIN, MODERATOR)
- **API endpoints**: 
  - `/subjects` - управление курсами
  - `/lessons` - управление уроками  
  - `/quizzes` - управление тестами
  - `/users` - управление пользователями
- **База данных**: Полная схема с User, Subject, Topic, Lesson, Quiz, Question, Answer, UserProgress, Certificate

## Необходимые улучшения для процесса обучения

### 1. Расширение модели Lesson
```typescript
model Lesson {
  id        String         @id @default(cuid())
  title     String
  content   String
  topicId   String
  topic     Topic          @relation(fields: [topicId], references: [id], onDelete: Cascade)
  quiz      Quiz?
  progress  UserProgress[]
  createdAt DateTime       @default(now()) @updatedAt @map("created_at")
  updatedAt DateTime       @updatedAt @map("updated_at")
  
  // Новые поля для улучшенного процесса обучения
  estimatedTime Int?        // Ориентировочное время прохождения (в минутах)
  difficulty    Int?        // Сложность урока (1-5)
  learningObjectives String? // Цели обучения
  prerequisites  String?    // Требования для прохождения
  videoUrl       String?    // Ссылка на видеоурок
  attachments    String[]   // Список вложений (PDF, документы и т.д.)
  order          Int        // Порядковый номер урока в теме
}
```

### 2. API для описания уроков
```typescript
// GET /lessons/:id/description
// Возвращает детальное описание урока с целями обучения и требованиями

// GET /lessons/:id/prerequisites  
// Возвращает список уроков, которые нужно пройти перед текущим

// GET /subjects/:id/learning-path
// Возвращает полный путь обучения по курсу с зависимостями
```

### 3. Улучшенная система прогресса
```typescript
model UserProgress {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId    String
  lesson      Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  isCompleted Boolean   @default(false)
  completedAt DateTime?
  score       Int?      // Балл за тест (если есть)
  timeSpent   Int?      // Время, потраченное на урок (в минутах)
  createdAt   DateTime  @default(now()) @updatedAt @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@unique([userId, lessonId])
}
```

### 4. Система рекомендаций
```typescript
// POST /users/:id/recommendations
// Возвращает рекомендации следующих уроков на основе прогресса

// GET /users/:id/learning-analytics
// Возвращает статистику обучения: время, прогресс, сильные/слабые стороны
```

### 5. Улучшенная система тестов
```typescript
model Quiz {
  id           String     @id @default(cuid())
  title        String
  lessonId     String     @unique
  lesson       Lesson     @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  questions    Question[]
  createdAt    DateTime   @default(now()) @updatedAt @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")
  
  // Новые поля
  timeLimit    Int?       // Ограничение времени (в минутах)
  maxAttempts  Int        @default(3) // Максимальное количество попыток
  passingScore Int        @default(70) // Процент для прохождения
  shuffleQuestions Boolean  @default(false) // Перемешивать вопросы
  shuffleAnswers Boolean  @default(false) // Перемешивать ответы
}
```

### 6. API для аналитики обучения
```typescript
// GET /analytics/user/:id/progress
// GET /analytics/user/:id/time-spent
// GET /analytics/user/:id/success-rate
// GET /analytics/course/:id/popular-lessons
```

### 7. Система уведомлений
```typescript
// POST /notifications/lesson-completed
// POST /notifications/quiz-result
// POST /notifications/recommendation
```

## Процесс обучения

### Этап 1: Выбор курса
1. Пользователь видит список всех курсов
2. Каждому курсу присвоен статус "Доступен" или "Скоро добавится"
3. Для курса охраны труда - детальное описание

### Этап 2: Изучение курса
1. Структура курса: Темы → Уроки → Тесты
2. Каждый урок имеет:
   - Описание и цели обучения
   - Теоретический материал
   - Практические задания (опционально)
   - Тест для проверки знаний

### Этап 3: Прохождение теста
1. После изучения урока пользователь проходит тест
2. Система проверяет ответы и выставляет балл
3. При успешном прохождении (>70%) урок отмечается как пройденный
4. При неуспешном - возможность повторной попытки

### Этап 4: Завершение курса
1. После прохождения всех уроков и тестов
2. Генерация сертификата
3. Обновление прогресса пользователя

## Требования к безопасности
- JWT аутентификация для всех защищенных endpoints
- Ролевая модель для доступа к управлению контентом
- Валидация всех входных данных
- Защита от CSRF атак

## Масштабируемость
- Пагинация для больших списков
- Кэширование частых запросов
- Асинхронная обработка длительных операций
- Мониторинг производительности