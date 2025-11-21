'use client'

import { useGetQuizByLessonIdQuery, useSubmitQuizMutation } from "@/src/api/hooks";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import type { QuizResultDto, UserAnswerDto, Quiz } from "@/src/api/types";
import { QuestionType } from "@/src/api/types/questionType";
import { errorCatch } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import type { Question } from "@/src/api/types/question";

interface QuizViewProps {
    lessonId: string;
}

export function QuizView({ lessonId }: QuizViewProps) {
    const router = useRouter();
    const { data: quiz, isLoading, isError, error } = useGetQuizByLessonIdQuery(lessonId, {
        retry: false // Don't retry on 404
    });
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
    const [quizResult, setQuizResult] = useState<QuizResultDto | null>(null);
    
    const quizId = quiz?.id ?? '';
    const submitMutation = useSubmitQuizMutation(quizId, {
        onSuccess: (data) => {
            setQuizResult(data);
        },
        onError: (error) => {
            console.error(error);
            alert('Ошибка при отправке теста.');
        }
    });

    if (isLoading) {
        return (
			<Card>
				<CardHeader>
					<Skeleton className="h-8 w-1/2" />
					<Skeleton className="h-4 w-1/3" />
				</CardHeader>
				<CardContent className="space-y-8">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="space-y-4">
							<Skeleton className="h-6 w-3/4" />
							<div className="space-y-2">
								<Skeleton className="h-5 w-1/2" />
								<Skeleton className="h-5 w-1/2" />
							</div>
						</div>
					))}
				</CardContent>
				<CardFooter>
					<Skeleton className="h-10 w-32" />
				</CardFooter>
			</Card>
		)
    }

    if (isError || (!isLoading && !quiz)) {
        // Явно обрабатываем тип error
        const errorMessage = (() => {
            if (error && typeof error === 'string') {
                return error;
            } else if (error && typeof error === 'object') {
                return errorCatch(error as Error);
            } else {
                return 'Неизвестная ошибка';
            }
        })();
        
        const hasError = !!error;
        
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <h3 className="text-xl font-semibold">Тест не найден</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Для урока с ID: {lessonId} тест не был найден.
                </p>
                {hasError && (
                    <div className="mt-4 w-full text-left text-xs text-red-500 bg-red-50 p-3 rounded">
                        <p className="font-bold">Техническая информация:</p>
                        <pre className="mt-1 whitespace-pre-wrap break-all">{errorMessage}</pre>
                    </div>
                )}
            </div>
        )
    }

    if (quizResult && quiz) { // Добавляем проверку на существование quiz
        const isPassed = quizResult.score === quizResult.totalQuestions;
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Результаты теста</CardTitle>
                    <CardDescription>{quiz.title}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-2xl font-bold">
                        Ваш результат: {quizResult.score} из {quizResult.totalQuestions}
                    </p>
                    {isPassed ? (
                        <p className="text-green-600">Отлично! Тест пройден. Урок будет отмечен как завершенный.</p>
                    ) : (
                        <p className="text-red-600">Тест не пройден. Пожалуйста, просмотрите материал и попробуйте еще раз.</p>
                    )}
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-2">
                    {isPassed ? (
                         <Button onClick={() => router.back()}>Вернуться к уроку</Button>
                    ) : (
                        <Button onClick={() => {
                            setQuizResult(null);
                            setSelectedAnswers({});
                        }}>Попробовать снова</Button>
                    )}
                </CardFooter>
            </Card>
        )
    }

    const handleSingleChoiceChange = (questionId: string, answerId: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: [answerId] }));
    }

    const handleMultipleChoiceChange = (questionId: string, answerId: string, checked: boolean) => {
        setSelectedAnswers(prev => {
            const existingAnswers = prev[questionId] || [];
            if (checked) {
                return { ...prev, [questionId]: [...existingAnswers, answerId] };
            } else {
                return { ...prev, [questionId]: existingAnswers.filter(id => id !== answerId) };
            }
        });
    }

    const handleSubmit = () => {
        const userAnswers: UserAnswerDto[] = Object.entries(selectedAnswers).map(([questionId, answerIds]) => ({
            questionId,
            answerIds,
        }));

        if (quiz && userAnswers.length !== quiz.questions.length) {
            alert('Пожалуйста, ответьте на все вопросы.');
            return;
        }

        submitMutation.mutate({ answers: userAnswers });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{quiz?.title}</CardTitle>
                <CardDescription>Ответьте на вопросы ниже.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {quiz?.questions.map((question: Question, index: number) => (
                    <div key={question.id}>
                        <p className="font-semibold">{index + 1}. {question.text}</p>
                        <div className="mt-4 space-y-2">
                            {question.type === QuestionType.SINGLE_CHOICE ? (
                                <RadioGroup
                                    onValueChange={(value) => handleSingleChoiceChange(question.id, value)}
                                    value={selectedAnswers[question.id]?.[0] || ""}
                                >
                                    {question.answers.map((answer) => (
                                        <div key={answer.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={answer.id} id={`${question.id}-${answer.id}`} />
                                            <Label htmlFor={`${question.id}-${answer.id}`}>{answer.text}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <div className="space-y-2">
                                    {question.answers.map((answer) => (
                                        <div key={answer.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${question.id}-${answer.id}`}
                                                onCheckedChange={(checked) => handleMultipleChoiceChange(question.id, answer.id, !!checked)}
                                                checked={selectedAnswers[question.id]?.includes(answer.id) || false}
                                            />
                                            <Label htmlFor={`${question.id}-${answer.id}`}>{answer.text}</Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit} disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? 'Отправка...' : 'Завершить тест'}
                </Button>
            </CardFooter>
        </Card>
    );
}
