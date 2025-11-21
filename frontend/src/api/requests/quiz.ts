import { instance } from "../instance";
import type { Quiz } from "../types/quiz";
import type { SubmitQuizDto, QuizResultDto } from "../types";

export const getQuizByLessonId = async (lessonId: string): Promise<Quiz> => {
    return await instance.get<Quiz>(`/quizzes/lesson/${lessonId}`).then(res => res.data);
}

export const submitQuiz = async (quizId: string, data: SubmitQuizDto): Promise<QuizResultDto> => {
    return await instance.post<QuizResultDto>(`/quizzes/${quizId}/submit`, data).then(res => res.data);
}
