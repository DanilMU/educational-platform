import { instance } from "../instance"
import { UserProgress } from "../types/progress"


export const getProgress = async () => {
	return await instance.get<UserProgress>('/progress/stats').then(res => res.data)
}
