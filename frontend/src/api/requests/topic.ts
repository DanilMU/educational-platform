import { instance } from '../instance';
import { Topic } from '../types';

export const getTopicById = async (id: string) => {
	return await instance.get<Topic>(`/topics/${id}`).then(res => res.data);
};