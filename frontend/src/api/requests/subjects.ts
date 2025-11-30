import { instance } from "../instance"

export const getAllSubjects = async (skip: string = '0', take: string = '10') => {
	return await instance.get('/subjects', { params: { skip, take } }).then(res => res.data);
}
