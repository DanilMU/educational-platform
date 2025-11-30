import { adminUsersApi, adminCoursesApi, adminLessonsApi } from './admin-wrapper';
import { PaginatedUsersDto, PaginatedSubjectsDto, PaginatedLessonsDto } from '../types';
import { AdminPaginatedUsersDto, AdminPaginatedSubjectsDto, AdminPaginatedLessonsDto, AdminSubject, AdminPaginatedTopicsDto } from '../types/admin-paginated-dto';
import { getAdminDashboardData as getAdminDashboardDataRaw } from './admin';
import { adminTopicsApi } from './admin-wrapper';

// Адаптеры для преобразования ответов админского API к формату, ожидаемому компонентами
export const adminApiAdapter = {
  // Users
  getAllUsers: async (params?: { skip?: string; take?: string }) => {
    const result = await adminUsersApi.getAll(params);
    // Преобразуем ответ от бэкенда { users, total } к формату { data, total }
    return {
      data: result.users,
      total: result.total
    };
  },

  // Courses
  getAllCourses: async (params?: { skip?: string; take?: string }) => {
    const result = await adminCoursesApi.getAll(params);
    // Преобразуем ответ от бэкенда { subjects, total } к формату { data, total }
    // Теперь бэкенд возвращает дополнительные поля topicsCount и lessonsCount
    return {
      data: result.subjects,
      total: result.total
    };
  },

  // Адаптер для получения расширенной информации о курсах (с количеством тем и уроков)
  getAllCoursesExtended: async (params?: { skip?: string; take?: string }) => {
    const result = await adminCoursesApi.getAll(params);
    // Возвращаем в формате, ожидаемом админским расширенным типом
    return {
      subjects: result.subjects,
      total: result.total
    };
  },

  // Lessons
 getAllLessons: async (params?: { skip?: string; take?: string }) => {
    const result = await adminLessonsApi.getAll(params);
    // Преобразуем ответ от бэкенда { lessons, total } к формату { data, total }
    return {
      data: result.lessons,
      total: result.total
    };
 },
  
  // Dashboard
  getDashboardData: getAdminDashboardDataRaw,
  
  // Topics
 getAllTopics: async (params?: { skip?: string; take?: string }) => {
    const result = await adminTopicsApi.getAll(params);
    // В админ-сервисе возвращается { topics, total }, а не { data, total }
    // Поэтому преобразуем к правильному формату
    return {
      data: result.topics || result.data,
      total: result.total
    };
 }
};