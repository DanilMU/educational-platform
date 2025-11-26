import { instance } from '../instance'
import type { Progress } from '../types'

export const getProgress = async () => {
	return await instance.get<Progress[]>('/progress').then(res => res.data)
}
