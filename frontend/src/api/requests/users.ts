import { instance } from '../instance'
import { GetMeDto } from '../types/getMeDto'

export const getMe = async () =>
	(await instance.get<GetMeDto>('/users/@me')).data

