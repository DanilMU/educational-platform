# Коллекция Postman для API образовательной платформы

Этот документ описывает коллекцию запросов API для образовательной платформы, включая все последние обновления.

## Базовый URL

Базовый URL для всех запросов: `http://localhost:3000`. Все эндпоинты API начинаются с `/api`, но для краткости это префикс опущен в примерах URL.

---

## Оглавление
1.  [Аутентификация (`/auth`)](#1-аутентификация-auth)
2.  [Пользователи (`/users`)](#2-пользователи-users)
3.  [Предметы (`/subjects`)](#3-предметы-subjects)
4.  [Темы (`/topics`)](#4-темы-topics)
5.  [Уроки (`/lessons`)](#5-уроки-lessons)
6.  [Викторины (`/quizzes`)](#6-викторины-quizzes)
7.  [Прогресс (`/progress`)](#7-прогресс-progress)
8.  [Сертификаты (`/certificates`)](#8-сертификаты-certificates)
9.  [Аналитика (`/analytics`)](#9-аналитика-analytics)
10. [Рекомендации (`/recommendations`)](#10-рекомендации-recommendations)
11. [Уведомления (`/notifications`)](#11-уведомления-notifications)
12. [Учебный путь (`/learning-path`)](#12-учебный-путь-learning-path)
13. [Файлы (`/files`)](#13-файлы-files)

---

## 1. Аутентификация (`/auth`)

### 1.1. Регистрация нового пользователя
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/auth/register`
*   **Тело:** `raw` (JSON)
    ```json
    {
      "firstName": "Иван",
      "lastName": "Иванов",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### 1.2. Вход существующего пользователя
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/auth/login`
*   **Тело:** `raw` (JSON)
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### 1.3. Обновление токена доступа
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/auth/refresh`
*   **Описание:** Генерирует новую пару токенов на основе `refreshToken` из cookie.

### 1.4. Выход пользователя
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/auth/logout`
*   **Описание:** Очищает cookie с `refreshToken`.

---

## 2. Пользователи (`/users`)

### 2.1. Получить профиль текущего пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/users/@me`
*   **Auth:** Bearer Token

### 2.2. Обновить профиль текущего пользователя
*   **Метод:** `PATCH`
*   **URL:** `{{baseUrl}}/users/@me`
*   **Auth:** Bearer Token
*   **Тело:** `raw` (JSON). Все поля опциональны.
    ```json
    {
      "firstName": "Петр",
      "city": "Москва",
      "receiveNotifications": false
    }
    ```

### 2.3. Изменить пароль текущего пользователя
*   **Метод:** `PATCH`
*   **URL:** `{{baseUrl}}/users/@me/password`
*   **Auth:** Bearer Token
*   **Тело:** `raw` (JSON)
    ```json
    {
      "currentPassword": "password123",
      "newPassword": "newStrongPassword456"
    }
    ```

### 2.4. Получить всех пользователей (только для администраторов)
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/users`
*   **Auth:** Bearer Token (от администратора).

---

## 3. Предметы (`/subjects`)

### 3.1. Получить все предметы
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/subjects`

### 3.2. Получить один предмет
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/subjects/:id`

### 3.3. Получить учебный путь по предмету
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/subjects/:id/learning-path`
*   **Описание:** Возвращает полную структуру курса с темами и уроками.

---

## 4. Темы (`/topics`)

*Все эндпоинты аналогичны `/subjects`, но для тем.*

---

## 5. Уроки (`/lessons`)

### 5.1. Получить все уроки
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/lessons`

### 5.2. Получить один урок
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/lessons/:id`

### 5.3. Получить детальное описание урока
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/lessons/:id/description`
*   **Описание:** Возвращает расширенную информацию об уроке, включая цели и требования.

### 5.4. Получить предварительные требования для урока
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/lessons/:id/prerequisites`
*   **Описание:** Возвращает список уроков, которые необходимо пройти перед этим.

---

## 6. Викторины (`/quizzes`)
*Эндпоинты для создания, обновления, удаления и прохождения тестов.*

### 6.1. Получить викторину по ID урока
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/quizzes/lesson/:lessonId`
*   **Auth:** Bearer Token

### 6.2. Отправить викторину
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/quizzes/:id/submit`
*   **Auth:** Bearer Token
*   **Тело:** `raw` (JSON)
    ```json
    {
      "answers": [
        {
          "questionId": "question-id-1",
          "answerIds": ["answer-id-for-q1"]
        }
      ]
    }
    ```

---

## 7. Прогресс (`/progress`)

### 7.1. Получить весь прогресс для текущего пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/progress`
*   **Auth:** Bearer Token

### 7.2. Завершить все уроки по предмету (админ/модератор)
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/progress/complete-subject`
*   **Auth:** Bearer Token (админ/модератор)
*   **Тело:** `raw` (JSON)
    ```json
    {
      "userId": "user-id-to-complete-for",
      "subjectId": "subject-id-to-complete"
    }
    ```

---

## 8. Сертификаты (`/certificates`)

### 8.1. Получить сертификаты для пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/certificates/user/:userId`
*   **Auth:** Bearer Token

### 8.2. Скачать PDF сертификата
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/certificates/:id/download`
*   **Auth:** Bearer Token
*   **Действие в Postman:** "Send and Download".

---

## 9. Аналитика (`/analytics`)
*Новый модуль для сбора статистики.*

### 9.1. Получить аналитику для текущего пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/analytics/current-user`
*   **Auth:** Bearer Token

### 9.2. Получить время, потраченное пользователем
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/analytics/user/:id/time-spent`
*   **Auth:** Bearer Token (админ или сам пользователь)

### 9.3. Получить процент успеха в тестах
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/analytics/user/:id/success-rate`
*   **Auth:** Bearer Token (админ или сам пользователь)

### 9.4. Получить популярные уроки в курсе
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/analytics/course/:id/popular-lessons`
*   **Auth:** Bearer Token

---

## 10. Рекомендации (`/recommendations`)
*Новый модуль для получения персональных рекомендаций.*

### 10.1. Получить рекомендации для текущего пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/recommendations/current-user`
*   **Auth:** Bearer Token

---

## 11. Уведомления (`/notifications`)
*Новый модуль для работы с уведомлениями.*

### 11.1. Получить уведомления для текущего пользователя
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/notifications/current-user`
*   **Auth:** Bearer Token

### 11.2. Отметить уведомление как прочитанное
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/notifications/:id/read`
*   **Auth:** Bearer Token

### 11.3. Удалить уведомление
*   **Метод:** `DELETE`
*   **URL:** `{{baseUrl}}/notifications/:id`
*   **Auth:** Bearer Token

---

## 12. Учебный путь (`/learning-path`)

### 12.1. Получить учебный путь по предмету
*   **Метод:** `GET`
*   **URL:** `{{baseUrl}}/learning-path/subjects/:id`
*   **Описание:** Возвращает полную структуру курса с темами и уроками.

---

## 13. Файлы (`/files`)

### 13.1. Загрузить файл
*   **Метод:** `POST`
*   **URL:** `{{baseUrl}}/files/upload`
*   **Auth:** Bearer Token
*   **Тело:** `form-data`
    *   **Ключ:** `file`
    *   **Тип:** `File`
    *   **Значение:** Выберите файл с вашего компьютера.

