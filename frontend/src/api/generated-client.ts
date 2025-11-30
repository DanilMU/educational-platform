import { getEducationPlatform } from './client';
import * as Types from './types';

const platform = getEducationPlatform();

// Auth
export const authControllerRegister = (registerRequest: Types.RegisterRequest) => platform.authControllerRegister(registerRequest).then(res => res.data);
export const authControllerLogin = (loginRequest: Types.LoginRequest) => platform.authControllerLogin(loginRequest).then(res => res.data);
export const authControllerRefresh = () => platform.authControllerRefresh().then(res => res.data);
export const authControllerLogout = () => platform.authControllerLogout().then(res => res.data);

// Users
export const usersControllerCreate = (createUserDto: Types.CreateUserDto) => platform.usersControllerCreate(createUserDto).then(res => res.data);
export const usersControllerGetAllUsers = (params?: Types.UsersControllerGetAllUsersParams) => platform.usersControllerGetAllUsers(params).then(res => res.data);
export const usersControllerGetMe = () => platform.usersControllerGetMe().then(res => res.data);
export const usersControllerUpdateMe = (updateUserDto: Types.UpdateUserDto) => platform.usersControllerUpdateMe(updateUserDto).then(res => res.data);
export const usersControllerChangePassword = (changePasswordDto: Types.ChangePasswordDto) => platform.usersControllerChangePassword(changePasswordDto).then(res => res.data);
export const usersControllerUpdate = (id: string, updateUserDto: Types.UpdateUserDto) => platform.usersControllerUpdate(id, updateUserDto).then(res => res.data);
export const usersControllerRemove = (id: string) => platform.usersControllerRemove(id).then(res => res.data);

// Subjects
export const subjectsControllerCreate = (createSubjectDto: Types.CreateSubjectDto) => platform.subjectsControllerCreate(createSubjectDto).then(res => res.data);
export const subjectsControllerFindAll = (params?: Types.SubjectsControllerFindAllParams) => platform.subjectsControllerFindAll(params).then(res => res.data);
export const subjectsControllerFindOne = (id: string) => platform.subjectsControllerFindOne(id).then(res => res.data);
export const subjectsControllerUpdate = (id: string, updateSubjectDto: Types.UpdateSubjectDto) => platform.subjectsControllerUpdate(id, updateSubjectDto).then(res => res.data);
export const subjectsControllerRemove = (id: string) => platform.subjectsControllerRemove(id).then(res => res.data);
export const subjectsControllerGetLearningPath = (id: string) => platform.subjectsControllerGetLearningPath(id).then(res => res.data);

// Topics
export const topicsControllerCreate = (createTopicDto: Types.CreateTopicDto) => platform.topicsControllerCreate(createTopicDto).then(res => res.data);
export const topicsControllerFindAll = (params?: Types.TopicsControllerFindAllParams) => platform.topicsControllerFindAll(params).then(res => res.data);
export const topicsControllerFindOne = (id: string) => platform.topicsControllerFindOne(id).then(res => res.data);
export const topicsControllerUpdate = (id: string, updateTopicDto: Types.UpdateTopicDto) => platform.topicsControllerUpdate(id, updateTopicDto).then(res => res.data);
export const topicsControllerRemove = (id: string) => platform.topicsControllerRemove(id).then(res => res.data);

// Lessons
export const lessonsControllerCreate = (createLessonDto: Types.CreateLessonDto) => platform.lessonsControllerCreate(createLessonDto).then(res => res.data);
export const lessonsControllerFindAll = (params?: Types.LessonsControllerFindAllParams) => platform.lessonsControllerFindAll(params).then(res => res.data);
export const lessonsControllerFindOne = (id: string) => platform.lessonsControllerFindOne(id).then(res => res.data);
export const lessonsControllerUpdate = (id: string, updateLessonDto: Types.UpdateLessonDto) => platform.lessonsControllerUpdate(id, updateLessonDto).then(res => res.data);
export const lessonsControllerRemove = (id: string) => platform.lessonsControllerRemove(id).then(res => res.data);
export const lessonsControllerGetLessonDescription = (id: string) => platform.lessonsControllerGetLessonDescription(id).then(res => res.data);
export const lessonsControllerGetLessonPrerequisites = (id: string) => platform.lessonsControllerGetLessonPrerequisites(id).then(res => res.data);

// Quizzes
export const quizzesControllerCreate = (createQuizDto: Types.CreateQuizDto) => platform.quizzesControllerCreate(createQuizDto).then(res => res.data);
export const quizzesControllerFindAll = () => platform.quizzesControllerFindAll().then(res => res.data);
export const quizzesControllerFindOne = (id: string) => platform.quizzesControllerFindOne(id).then(res => res.data);
export const quizzesControllerUpdate = (id: string, updateQuizDto: Types.UpdateQuizDto) => platform.quizzesControllerUpdate(id, updateQuizDto).then(res => res.data);
export const quizzesControllerRemove = (id: string) => platform.quizzesControllerRemove(id).then(res => res.data);
export const quizzesControllerFindByLessonId = (lessonId: string) => platform.quizzesControllerFindByLessonId(lessonId).then(res => res.data);
export const quizzesControllerSubmit = (id: string, submitQuizDto: Types.SubmitQuizDto) => platform.quizzesControllerSubmit(id, submitQuizDto).then(res => res.data);

// Progress
export const progressControllerCreate = (createProgressDto: Types.CreateProgressDto) => platform.progressControllerCreate(createProgressDto).then(res => res.data);
export const progressControllerFindAll = () => platform.progressControllerFindAll().then(res => res.data);
export const progressControllerFindOne = (lessonId: string) => platform.progressControllerFindOne(lessonId).then(res => res.data);
export const progressControllerUpdate = (lessonId: string, updateProgressDto: Types.UpdateProgressDto) => platform.progressControllerUpdate(lessonId, updateProgressDto).then(res => res.data);
export const progressControllerRemove = (lessonId: string) => platform.progressControllerRemove(lessonId).then(res => res.data);
export const progressControllerCompleteSubject = (completeSubjectDto: Types.CompleteSubjectDto) => platform.progressControllerCompleteSubject(completeSubjectDto).then(res => res.data);

// Notifications
export const notificationsControllerCreateNotification = () => platform.notificationsControllerCreateNotification().then(res => res.data);
export const notificationsControllerCreateRecommendationNotification = () => platform.notificationsControllerCreateRecommendationNotification().then(res => res.data);
export const notificationsControllerGetUserNotifications = (id: string) => platform.notificationsControllerGetUserNotifications(id).then(res => res.data);
export const notificationsControllerGetCurrentUserNotifications = () => platform.notificationsControllerGetCurrentUserNotifications().then(res => res.data);
export const notificationsControllerMarkAsRead = (id: string) => platform.notificationsControllerMarkAsRead(id).then(res => res.data);
export const notificationsControllerDeleteNotification = (id: string) => platform.notificationsControllerDeleteNotification(id).then(res => res.data);

// Certificates
export const certificatesControllerCreate = (createCertificateDto: Types.CreateCertificateDto) => platform.certificatesControllerCreate(createCertificateDto).then(res => res.data);
export const certificatesControllerFindAll = () => platform.certificatesControllerFindAll().then(res => res.data);
export const certificatesControllerFindByUser = (userId: string) => platform.certificatesControllerFindByUser(userId).then(res => res.data);
export const certificatesControllerFindOne = (id: string) => platform.certificatesControllerFindOne(id).then(res => res.data);
export const certificatesControllerDownload = (id: string) => platform.certificatesControllerDownload(id).then(res => res.data);

// Files
export const filesControllerUploadFile = (filesControllerUploadFileBody: Types.FilesControllerUploadFileBody) => platform.filesControllerUploadFile(filesControllerUploadFileBody).then(res => res.data);

// Recommendations
export const recommendationsControllerGetRecommendationsForUser = (id: string) => platform.recommendationsControllerGetRecommendationsForUser(id).then(res => res.data);
export const recommendationsControllerGetRecommendationsForCurrentUser = () => platform.recommendationsControllerGetRecommendationsForCurrentUser().then(res => res.data);

// Admin
export const adminControllerGetDashboard = () => platform.adminControllerGetDashboard().then(res => res.data);
export const adminControllerGetUsers = () => platform.adminControllerGetUsers().then(res => res.data);
export const adminControllerGetCourses = () => platform.adminControllerGetCourses().then(res => res.data);

// Analytics
export const analyticsControllerGetUserAnalytics = (id: string) => platform.analyticsControllerGetUserAnalytics(id).then(res => res.data);
export const analyticsControllerGetCurrentUserAnalytics = () => platform.analyticsControllerGetCurrentUserAnalytics().then(res => res.data);
export const analyticsControllerGetTimeSpent = (id: string) => platform.analyticsControllerGetTimeSpent(id).then(res => res.data);
export const analyticsControllerGetSuccessRate = (id: string) => platform.analyticsControllerGetSuccessRate(id).then(res => res.data);
export const analyticsControllerGetUserProgressOverTime = (id: string) => platform.analyticsControllerGetUserProgressOverTime(id).then(res => res.data);
export const analyticsControllerGetPopularLessons = (id: string) => platform.analyticsControllerGetPopularLessons(id).then(res => res.data);
export const analyticsControllerGetCourseAnalytics = (id: string) => platform.analyticsControllerGetCourseAnalytics(id).then(res => res.data);

// Learning Path
export const learningPathControllerGetLearningPath = (id: string) => platform.learningPathControllerGetLearningPath(id).then(res => res.data);

// User Analytics
export const userAnalyticsControllerGetCurrentUserAnalytics = () => platform.userAnalyticsControllerGetCurrentUserAnalytics().then(res => res.data);
