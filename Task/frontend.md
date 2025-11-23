# Frontend - Улучшение UI/UX с современными библиотеками

## Текущее состояние
- **Фронтенд**: Next.js 16 с App Router
- **UI библиотека**: shadcn/ui + Radix UI primitives
- **Стили**: Tailwind CSS v4 с кастомными токенами
- **Состояние**: React Query для серверного состояния
- **Архитектура**: Модульная структура с четким разделением

## Необходимые улучшения для UI/UX

### 1. Главная страница (Hero Section) с параллакс эффектом
```typescript
// Улучшенный HeroSection с параллаксом
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Параллакс фон */}
      <div className="absolute inset-0 z-0">
        <ParallaxBackground />
      </div>
      
      {/* Основной контент */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <AnimatedTitle />
        <AnimatedDescription />
        <AnimatedButtons />
      </div>
      
      {/* Интерактивные элементы */}
      <FloatingParticles />
    </section>
  )
}
```

### 2. Страница курсов с улучшенным дизайном
```typescript
// Улучшенная SubjectCard с анимациями
export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-xl border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      
      {/* Контент */}
      <Card className="relative">
        <CardHeader className="flex-row items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <BookOpen className="size-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
              {subject.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">Охрана труда</Badge>
              <span className="text-sm text-muted-foreground">12 уроков</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Progress value={75} className="h-2" />
          <p className="text-sm text-muted-foreground line-clamp-3">
            {getDescription(subject.description)}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button asChild className="w-full group-hover:bg-blue-600">
            <Link href={`/subjects/${subject.id}`}>
              Продолжить обучение
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
```

### 3. Страница детального просмотра курса
```typescript
// Улучшенная страница курса с таймлайном
export function SubjectDetails({ subjectId }: SubjectDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок курса */}
      <CourseHeader subject={subject} />
      
      {/* Прогресс обучения */}
      <LearningProgress totalLessons={totalLessons} completedLessons={completedLessons} />
      
      {/* Структура курса как таймлайн */}
      <div className="relative mt-12">
        <Timeline topics={subject.topics} />
      </div>
    </div>
  )
}

// Компонент Timeline
function Timeline({ topics }: { topics: Topic[] }) {
  return (
    <div className="relative">
      {/* Вертикальная линия */}
      <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
      
      {topics.map((topic, index) => (
        <TimelineItem key={topic.id} topic={topic} isActive={index === 0} />
      ))}
    </div>
  )
}
```

### 4. Страница урока с улучшенным UX
```typescript
// Улучшенная страница урока
export function LessonDetails({ lessonId }: LessonDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Боковая панель с навигацией */}
      <LessonNavigation lessons={lessons} currentLessonId={lessonId} />
      
      {/* Основной контент */}
      <div className="flex-1">
        <LessonHeader lesson={lesson} />
        <LessonContent lesson={lesson} />
        <LessonActions lesson={lesson} />
      </div>
      
      {/* Плавающая панель прогресса */}
      <FloatingProgress />
    </div>
  )
}
```

### 5. Улучшенный интерфейс тестов
```typescript
// Улучшенный QuizView с анимациями
export function QuizView({ lessonId }: QuizViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Заголовок теста с таймером */}
      <QuizHeader quiz={quiz} timeRemaining={timeRemaining} />
      
      {/* Прогресс теста */}
      <div className="mb-8">
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-muted-foreground mt-2">
          Вопрос {currentQuestion} из {totalQuestions}
        </p>
      </div>
      
      {/* Вопросы с анимациями */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard question={currentQuestion} />
        </motion.div>
      </AnimatePresence>
      
      {/* Навигация по вопросам */}
      <QuestionNavigation questions={quiz.questions} currentQuestion={currentQuestion} />
    </div>
  )
}
```

### 6. Персонализированный Dashboard
```typescript
// Улучшенный Dashboard с виджетами
export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Приветственный блок */}
      <WelcomeSection user={user} />
      
      {/* Статистика обучения */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LearningStatsCard 
          title="Пройдено уроков"
          value={completedLessons}
          total={totalLessons}
          icon={BookOpen}
        />
        <TimeSpentCard timeSpent={timeSpent} />
        <AchievementsCard achievements={achievements} />
        <CurrentCourseCard currentCourse={currentCourse} />
      </div>
      
      {/* Активные курсы */}
      <ActiveCoursesSection courses={activeCourses} />
      
      {/* Рекомендации */}
      <RecommendationsSection recommendations={recommendations} />
    </div>
  )
}
```

### 7. Мобильная адаптация
```typescript
// Адаптивные компоненты для мобильных устройств
export function ResponsiveNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <MobileSidebar />
      </SheetContent>
    </Sheet>
  )
}
```

## Новые компоненты для реализации

### 1. Анимированные компоненты
- `AnimatedCounter` - счетчик с анимацией
- `ProgressRing` - кольцевой прогресс
- `StaggeredList` - список с анимацией появления
- `HoverCard` - карточка при наведении

### 2. Интерактивные элементы
- `DragDropList` - перетаскивание элементов
- `SearchHighlight` - подсветка поиска
- `VirtualScroll` - виртуальная прокрутка для больших списков
- `InfiniteScroll` - бесконечная прокрутка

### 3. Формы улучшенного UX
- `MultiStepForm` - многошаговые формы
- `AutoSaveForm` - автосохранение форм
- `FormValidation` - визуальная валидация форм
- `FileUpload` - улучшенный загрузчик файлов

## Интеграция с API

### 1. Улучшенные React Query хуки
```typescript
// useGetLessonWithProgressQuery
export function useGetLessonWithProgressQuery(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId, 'progress'],
    queryFn: () => api.getLessonWithProgress(lessonId),
    select: (data) => ({
      ...data,
      progress: calculateProgress(data.userProgress, data.quiz)
    })
  })
}

// useGetRecommendationsQuery
export function useGetRecommendationsQuery(userId: string) {
  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => api.getUserRecommendations(userId)
  })
}
```

### 2. Кэширование и оптимизация
- Предзагрузка контента
- Оффлайн режим
- Оптимизация изображений
- Code splitting для больших компонентов

## Тестирование
- Unit тесты для компонентов
- Integration тесты для страниц
- E2E тесты для пользовательских сценариев
- Тесты производительности