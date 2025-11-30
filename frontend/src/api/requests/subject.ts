import { instance } from '../instance'
import { Subject, LearningPathDto } from '../types'
import { subjectsControllerFindAll, subjectsControllerGetLearningPath, subjectsControllerFindOne } from '../generated-client'

export const getAllSubjects = async (skip: string, take: string) => {
	const response = await subjectsControllerFindAll({ skip, take });
	return response;
}

export const getSubjectById = async (id: string) => {
	return await subjectsControllerFindOne(id);
}

export const getEnrolledSubjects = async (id: string) => {
	return await subjectsControllerGetLearningPath(id);
}
