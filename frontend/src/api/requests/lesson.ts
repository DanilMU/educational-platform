import { instance } from "../instance"
import { Lesson } from "../types/lesson"

export const getLessonById = async (id: string) => {
	return await instance.get<Lesson>(`/lessons/${id}`).then(res => res.data);
}
