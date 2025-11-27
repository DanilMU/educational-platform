import { instance } from '../instance'
import type { Progress, UpdateProgressDto } from '../types'

export const getProgress = async () => {
	return await instance.get<Progress[]>('/progress').then(res => res.data)
}

export const updateProgress = async (lessonId: string, data: UpdateProgressDto) => {
	return await instance.patch<Progress>(`/progress/${lessonId}`, data).then(res => res.data)
}
