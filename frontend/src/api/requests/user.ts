import { instance } from "../instance"
import { User } from "../types/user"


export const getProfile = async () => {
	return await instance.get<User>('/users/profile').then(res => res.data)
}
