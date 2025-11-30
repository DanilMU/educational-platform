import { instance } from '../instance'
import { Topic } from '../types'
import { topicsControllerFindAll, topicsControllerFindOne } from '../generated-client'

export const getAllTopicsPaginated = async (skip: string, take: string) => {
	const response = await topicsControllerFindAll({ skip, take });
	return response;
}

export const getTopicById = async (id: string) => {
	return await topicsControllerFindOne(id);
}
