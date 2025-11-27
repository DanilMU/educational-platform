import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';
import { ProgressService } from '../progress/progress.service';

import {
	CreateQuizDto,
	QuizResultDto,
	SubmitQuizDto,
	UpdateQuizDto
} from './dto';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly progressService: ProgressService,
		private readonly notificationsService: NotificationsService
	) {}

	create(createQuizDto: CreateQuizDto) {
		const { questions, ...rest } = createQuizDto;

		return this.prisma.quiz.create({
			data: {
				...rest,
				questions: {
					create: questions.map(question => ({
						...question,
						answers: {
							create: question.answers
						}
					}))
				}
			}
		});
	}

	findAll() {
		return this.prisma.quiz.findMany({
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});
	}

	async findOne(id: string) {
		const quiz = await this.prisma.quiz.findUnique({
			where: { id },
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});

		if (!quiz) {
			throw new NotFoundException(`Quiz with ID ${id} not found`);
		}

		return quiz;
	}

	async update(id: string, updateQuizDto: UpdateQuizDto) {
		const { questions, ...rest } = updateQuizDto;

		return this.prisma.$transaction(async tx => {
			if (Object.keys(rest).length > 0) {
				await tx.quiz.update({
					where: { id },
					data: rest
				});
			}

			if (questions) {
				const existingQuestions = (await tx.question.findMany({
					where: { quizId: id }
				})) as { id: string }[];
				const existingQuestionIds = existingQuestions.map(
					(q: { id: string }) => q.id
				);
				const incomingQuestionIds = questions
					.map(q => q.id)
					.filter(Boolean);

				const questionIdsToDelete = existingQuestionIds.filter(
					existingId => !incomingQuestionIds.includes(existingId)
				);

				if (questionIdsToDelete.length > 0) {
					await tx.question.deleteMany({
						where: { id: { in: questionIdsToDelete } }
					});
				}

				for (const questionDto of questions) {
					const { answers } = questionDto;
					const upsertedQuestion = await tx.question.upsert({
						where: { id: questionDto.id || '' },
						create: {
							text: questionDto.text!, // Assuming text is always provided for new questions
							type: questionDto.type!, // Assuming type is always provided for new questions
							quiz: { connect: { id } }
						},
						update: {
							// Only include properties that are explicitly defined in the DTO for update
							...(questionDto.text !== undefined && {
								text: questionDto.text
							}),
							...(questionDto.type !== undefined && {
								type: questionDto.type
							})
						}
					});

					if (answers) {
						await tx.answer.deleteMany({
							where: { questionId: upsertedQuestion.id }
						});

						await tx.answer.createMany({
							data: answers.map(answer => ({
								text: answer.text!,
								isCorrect: answer.isCorrect!,
								questionId: upsertedQuestion.id
							}))
						});
					}
				}
			}

			return tx.quiz.findUnique({
				where: { id },
				include: {
					questions: {
						include: {
							answers: true
						}
					}
				}
			});
		});
	}

	async submit(
		userId: string,
		quizId: string,
		submitQuizDto: SubmitQuizDto
	): Promise<QuizResultDto> {
		const quiz = await this.prisma.quiz.findUnique({
			where: { id: quizId },
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});

		if (!quiz) {
			throw new NotFoundException(`Quiz with ID ${quizId} not found`);
		}

		const correctAnswersMap = new Map<string, string[]>();
		quiz.questions.forEach(
			(question: {
				id: string;
				answers: { isCorrect: boolean; id: string }[];
			}) => {
				const correctIds = question.answers
					.filter(
						(a: { isCorrect: boolean; id: string }) => a.isCorrect
					)
					.map((a: { id: string }) => a.id);
				correctAnswersMap.set(question.id, correctIds);
			}
		);

		let score = 0;
		for (const userAnswer of submitQuizDto.answers) {
			const correctIds = correctAnswersMap.get(userAnswer.questionId);
			if (!correctIds) continue;

			const userIds = userAnswer.answerIds.sort();
			const sortedCorrectIds = [...correctIds].sort();

			if (JSON.stringify(userIds) === JSON.stringify(sortedCorrectIds)) {
				score++;
			}
		}

		const totalQuestions = quiz.questions.length;
		const userScorePercentage = (score / totalQuestions) * 100;
		const passed = userScorePercentage >= quiz.passingScore;

		const result = {
			score,
			totalQuestions
		};

		// Отправляем уведомление о результатах теста
		try {
			await this.notificationsService.createNotification({
				userId,
				type: 'quiz-result',
				title: 'Результаты теста',
				message: `Вы набрали ${score} из ${totalQuestions} баллов`,
				data: {
					quizId,
					score,
					totalQuestions,
					passed
				},
				isRead: false
			});
		} catch (error) {
			// Логируем ошибку, но не прерываем основной процесс
			console.error('Error sending quiz result notification:', error);
		}

		if (passed) {
			await this.progressService.update(userId, quiz.lessonId, {
				isCompleted: true,
				score
			});
		}

		return result;
	}

	async findByLessonId(lessonId: string): Promise<Quiz> {
		const quiz = await this.prisma.quiz.findFirst({
			where: { lessonId },
			include: {
				questions: {
					include: {
						// ПРИМЕЧАНИЕ: Отправка 'isCorrect' на клиент является уязвимостью.
						// В будущем это следует исправить, используя DTO, который не включает это поле.
						answers: true
					}
				}
			}
		});

		if (!quiz) {
			throw new NotFoundException(
				`Тест для урока с ID "${lessonId}" не найден.`
			);
		}

		return {
			...quiz,
			timeLimit: quiz.timeLimit ?? undefined
		} as Quiz;
	}

	remove(id: string): Promise<Quiz> {
		return this.prisma.quiz.delete({
			where: { id },
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		}) as Promise<Quiz>;
	}
}
