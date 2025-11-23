# Схема базы данных Prisma

Этот документ описывает схему базы данных, используемую в проекте, на основе моделей Prisma.

## Модели

### `User`

Хранит информацию о пользователях системы.

- `id`: Уникальный идентификатор (String, cuid)
- `firstName`, `lastName`: Имя и фамилия (String, опционально)
- `email`: Уникальный email (String)
- `password`: Хэшированный пароль (String)
- `role`: Роль пользователя (`STUDENT`, `ADMIN`, `MODERATOR`)
- `avatarUrl`, `phone`, `dob`, `city`: Дополнительные поля профиля (String, опционально)
- `receiveNotifications`: Флаг получения уведомлений (Boolean, по умолчанию `true`)
- `progress`: Связь с прогрессом пользователя (`UserProgress[]`)
- `certificates`: Связь с сертификатами (`Certificate[]`)
- `notifications`: Связь с уведомлениями (`Notification[]`)

### `Subject`

Представляет учебный курс или предмет.

- `id`: Уникальный идентификатор (String, cuid)
- `title`, `description`: Название и описание предмета (String)
- `topics`: Связь с темами внутри предмета (`Topic[]`)
- `certificates`: Связь с сертификатами по этому предмету (`Certificate[]`)

### `Topic`

Тема внутри предмета. Может иметь иерархическую структуру.

- `id`: Уникальный идентификатор (String, cuid)
- `title`: Название темы (String)
- `subjectId`: ID родительского предмета (String)
- `parentId`: ID родительской темы (для подтем) (String, опционально)
- `lessons`: Связь с уроками (`Lesson[]`)

### `Lesson`

Учебный урок внутри темы.

- `id`: Уникальный идентификатор (String, cuid)
- `title`, `content`: Название и содержимое урока (String)
- `topicId`: ID родительской темы (String)
- `estimatedTime`, `difficulty`, `order`: Метаданные урока (Int, опционально)
- `learningObjectives`, `prerequisites`, `videoUrl`: Дополнительные учебные материалы (String, опционально)
- `attachments`: Список вложений (String[])
- `quiz`: Связь с тестом (`Quiz?`)
- `progress`: Связь с прогрессом пользователей по этому уроку (`UserProgress[]`)

### `Quiz`, `Question`, `Answer`

Модели для создания тестов.

- **`Quiz`**: Тест, привязанный к уроку (`lessonId`). Содержит настройки (лимит времени, попытки) и вопросы (`Question[]`).
- **`Question`**: Вопрос внутри теста. Имеет текст и тип (`SINGLE_CHOICE`, `MULTIPLE_CHOICE`).
- **`Answer`**: Вариант ответа на вопрос. Имеет текст и флаг `isCorrect`.

### `UserProgress`

Отслеживает прогресс пользователя по конкретному уроку.

- `id`: Уникальный идентификатор (String, cuid)
- `userId`, `lessonId`: ID пользователя и урока. Вместе составляют уникальный ключ.
- `isCompleted`: Завершен ли урок (Boolean)
- `completedAt`: Дата завершения (DateTime, опционально)
- `score`: Балл за тест (Int, опционально)
- `timeSpent`: Потраченное время в минутах (Int, опционально)

### `Certificate`

Сертификат, выдаваемый пользователю по завершении предмета.

- `id`: Уникальный идентификатор (String, cuid)
- `userId`, `subjectId`: ID пользователя и предмета.
- `issuedAt`: Дата выдачи (DateTime)
- `url`: URL для доступа к сертификату (String)

### `Notification`

Уведомление для пользователя.

- `id`: Уникальный идентификатор (String, cuid)
- `userId`: ID пользователя (String)
- `type`: Тип уведомления (String, например, `lesson-completed`)
- `title`, `message`: Заголовок и текст (String)
- `data`: Дополнительные данные в формате JSON (Json, опционально)
- `isRead`: Статус прочтения (Boolean)

## Отношения

- **Один-ко-многим**:
    - `User` -> `UserProgress`, `Certificate`, `Notification`
    - `Subject` -> `Topic`, `Certificate`
    - `Topic` -> `Lesson`
    - `Quiz` -> `Question`
    - `Question` -> `Answer`
- **Один-к-одному**:
    - `Lesson` <-> `Quiz`
- **Многие-ко-многим (через явную модель `UserProgress`)**:
    - `User` <-> `Lesson`
- **Иерархия (один-ко-многим на себя)**:
    - `Topic` -> `Topic` (через `parentId`)