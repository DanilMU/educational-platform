import { instance } from '../instance'
import { Progress, UpdateProgressDto } from '../types'

export const getUserProgress = async () => {
	const response = await instance.get('/progress');
	return response.data;
}

export const getProgressByLessonId = async (lessonId: string) => {
	const response = await instance.get(`/progress/${lessonId}`);
	return response.data;
}

export const updateProgress = async (lessonId: string, data: UpdateProgressDto) => {
	const response = await instance.patch(`/progress/${lessonId}`, data);
	return response.data;
}

export const markLessonAsCompleted = async (lessonId: string) => {
	const response = await instance.post(`/progress/${lessonId}/mark-completed`);
	return response.data;
}
