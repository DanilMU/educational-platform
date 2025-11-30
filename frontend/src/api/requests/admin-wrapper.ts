import { instance } from '../instance';
import { User, Subject, Lesson, Topic, CreateUserDto, UpdateUserDto, CreateSubjectDto, UpdateSubjectDto, CreateLessonDto, UpdateLessonDto, CreateTopicDto, UpdateTopicDto, PaginatedUsersDto, PaginatedSubjectsDto, PaginatedLessonsDto, PaginatedTopicsDto } from '../types';
import { AdminPaginatedUsersDto, AdminPaginatedSubjectsDto, AdminPaginatedLessonsDto } from '../types/admin-paginated-dto';

// Users
export const adminUsersApi = {
  getAll: (params?: { skip?: string; take?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip);
    if (params?.take) queryParams.append('take', params.take);
    return instance.get<AdminPaginatedUsersDto>(`/admin/users?${queryParams.toString()}`).then(res => res.data);
  },
  getById: (id: string) => instance.get<User>(`/admin/users/${id}`).then(res => res.data),
  create: (userData: CreateUserDto) => instance.post<User>('/admin/users', userData).then(res => res.data),
  update: (id: string, userData: UpdateUserDto) => instance.patch<User>(`/admin/users/${id}`, userData).then(res => res.data),
  delete: (id: string) => instance.delete<User>(`/admin/users/${id}`).then(res => res.data),
};

// Courses
export const adminCoursesApi = {
  getAll: (params?: { skip?: string; take?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip);
    if (params?.take) queryParams.append('take', params.take);
    return instance.get<AdminPaginatedSubjectsDto>(`/admin/courses?${queryParams.toString()}`).then(res => res.data);
  },
  getById: (id: string) => instance.get<Subject>(`/admin/courses/${id}`).then(res => res.data),
  create: (courseData: CreateSubjectDto) => instance.post<Subject>('/admin/courses', courseData).then(res => res.data),
  update: (id: string, courseData: UpdateSubjectDto) => instance.patch<Subject>(`/admin/courses/${id}`, courseData).then(res => res.data),
  delete: (id: string) => instance.delete<Subject>(`/admin/courses/${id}`).then(res => res.data),
};

// Topics
export const adminTopicsApi = {
  getAll: (params?: { skip?: string; take?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip);
    if (params?.take) queryParams.append('take', params.take);
    return instance.get<PaginatedTopicsDto>(`/admin/topics?${queryParams.toString()}`).then(res => res.data);
  },
  getById: (id: string) => instance.get<Topic>(`/admin/topics/${id}`).then(res => res.data),
  create: (topicData: CreateTopicDto) => instance.post<Topic>('/admin/topics', topicData).then(res => res.data),
  update: (id: string, topicData: UpdateTopicDto) => instance.patch<Topic>(`/admin/topics/${id}`, topicData).then(res => res.data),
  delete: (id: string) => instance.delete<Topic>(`/admin/topics/${id}`).then(res => res.data),
};

// Lessons
export const adminLessonsApi = {
  getAll: (params?: { skip?: string; take?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip);
    if (params?.take) queryParams.append('take', params.take);
    return instance.get<AdminPaginatedLessonsDto>(`/admin/lessons?${queryParams.toString()}`).then(res => res.data);
  },
  getById: (id: string) => instance.get<Lesson>(`/admin/lessons/${id}`).then(res => res.data),
  create: (lessonData: CreateLessonDto) => instance.post<Lesson>('/admin/lessons', lessonData).then(res => res.data),
  update: (id: string, lessonData: UpdateLessonDto) => instance.patch<Lesson>(`/admin/lessons/${id}`, lessonData).then(res => res.data),
  delete: (id: string) => instance.delete<Lesson>(`/admin/lessons/${id}`).then(res => res.data),
};