import { instance } from "../instance"
import { User } from "../types/user"
import { UpdateUserDto } from "../types/updateUserDto"
import { GetMeDto } from "../types"


export const getProfile = async () => {
	return await instance.get<GetMeDto>('/users/@me').then(res => res.data)
}

export const updateProfile = async (data: UpdateUserDto) => {
	return await instance.patch<User>('/users/@me', data).then(res => res.data)
}

export const updatePassword = async (currentPassword: string, newPassword: string) => {
	return await instance.patch('/users/@me/password', {
	currentPassword,
		newPassword
	}).then(res => res.data)
}
