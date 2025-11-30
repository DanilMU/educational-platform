/**
 * Типы данных для админских API, возвращающие { users, total } вместо { data, total }
 */

import { User, Subject, Lesson, Topic } from '.';

export interface AdminPaginatedUsersDto {
  users: User[];
  total: number;
}

// Расширяем Subject с дополнительными полями для админки
export interface AdminSubject extends Subject {
  topicsCount: number;
 lessonsCount: number;
}

export interface AdminPaginatedSubjectsDto {
  subjects: AdminSubject[];
  total: number;
}

export interface AdminPaginatedTopicsDto {
  topics: Topic[];
  total: number;
}

export interface AdminPaginatedLessonsDto {
  lessons: Lesson[];
  total: number;
}