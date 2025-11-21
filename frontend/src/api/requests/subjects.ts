import { instance } from "../instance"
import { Subject } from "../types/subject"

export const getAllSubjects = async () => {
	return await instance.get<Subject[]>('/subjects').then(res => res.data);
}
