import { instance } from "../instance"
import { AnalyticsDto } from "../types/analyticsDto"

export const getAnalytics = async () => {
	return await instance.get<AnalyticsDto>('/analytics/current-user').then(res => res.data)
}

export const getUserAnalytics = async (userId: string) => {
	return await instance.get<AnalyticsDto>(`/analytics/users/${userId}`).then(res => res.data)
}

export const getTimeSpent = async (userId: string) => {
	return await instance.get<{ timeSpent: number }>(`/analytics/user/${userId}/time-spent`).then(res => res.data)
}

export const getSuccessRate = async (userId: string) => {
	return await instance.get<{ successRate: number }>(`/analytics/user/${userId}/success-rate`).then(res => res.data)
}

export const getPopularLessons = async (courseId: string) => {
	return await instance.get<{ lessonId: string; completions: number }[]>(`/analytics/course/${courseId}/popular-lessons`).then(res => res.data)
}