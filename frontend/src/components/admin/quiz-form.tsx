'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/src/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/src/components/ui/select'
import { Textarea } from '@/src/components/ui/textarea'
import {
	useCreateAdminQuizMutation,
	useUpdateAdminQuizMutation,
} from '@/src/api/hooks/useAdminQuizzes'
import { useAdminLessonsQuery } from '@/src/api/hooks/useAdminLessons'
import type { Quiz, CreateQuizDto, UpdateQuizDto } from '@/src/api/types'
import { QuestionType } from '@/src/api/types'
import { Trash } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

const answerSchema = z.object({
	id: z.string().optional(),
	text: z.string().min(1, 'Текст ответа обязателен'),
	isCorrect: z.boolean().default(false),
})

const questionSchema = z.object({
	id: z.string().optional(),
	text: z.string().min(1, 'Текст вопроса обязателен'),
	type: z.nativeEnum(QuestionType),
	answers: z.array(answerSchema).min(2, 'Минимум два ответа'),
})

const quizSchema = z.object({
	title: z.string().min(1, 'Название теста обязательно'),
	lessonId: z.string().min(1, 'Урок обязателен'),
	questions: z.array(questionSchema).min(1, 'Минимум один вопрос'),
})

type QuizFormValues = z.infer<typeof quizSchema>

interface QuizFormProps {
	quiz: Quiz | null
	onSuccess: () => void
}

export function QuizForm({ quiz, onSuccess }: QuizFormProps) {
	const createQuizMutation = useCreateAdminQuizMutation()
	const updateQuizMutation = useUpdateAdminQuizMutation()
	const { data: lessonsData, isLoading: isLoadingLessons } =
		useAdminLessonsQuery({})

	const form = useForm<QuizFormValues>({
		resolver: zodResolver(quizSchema),
		defaultValues: {
			title: quiz?.title ?? '',
			lessonId: quiz?.lessonId ?? '',
			questions: quiz?.questions ?? [],
		},
	})

	const {
		fields: questionsFields,
		append: appendQuestion,
		remove: removeQuestion,
	} = useFieldArray({
		control: form.control,
		name: 'questions',
	})

	const onSubmit = (values: QuizFormValues) => {
		if (quiz) {
			updateQuizMutation.mutate(
				{ id: quiz.id, quizData: values as UpdateQuizDto },
				{ onSuccess }
			)
		} else {
			createQuizMutation.mutate(values as CreateQuizDto, { onSuccess })
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название теста</FormLabel>
							<FormControl>
								<Input placeholder='Тест по основам' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lessonId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Урок</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Выберите урок' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{isLoadingLessons ? (
										<SelectItem value='loading' disabled>
											Загрузка уроков...
										</SelectItem>
									) : (
										lessonsData?.data.map(lesson => (
											<SelectItem key={lesson.id} value={lesson.id}>
												{lesson.title}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>Вопросы</h3>
					{questionsFields.map((questionField, qIndex) => (
						<div
							key={questionField.id}
							className='space-y-3 rounded-md border p-4'
						>
							<div className='flex items-center justify-between'>
								<h4 className='font-semibold'>Вопрос {qIndex + 1}</h4>
								<Button
									type='button'
									variant='destructive'
									size='icon'
									onClick={() => removeQuestion(qIndex)}
								>
									<Trash className='h-4 w-4' />
								</Button>
							</div>
							<FormField
								control={form.control}
								name={`questions.${qIndex}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Текст вопроса</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Что такое...?'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`questions.${qIndex}.type`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Тип вопроса</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Выберите тип' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={QuestionType.SINGLE_CHOICE}>
													Одиночный выбор
												</SelectItem>
												<SelectItem value={QuestionType.MULTIPLE_CHOICE}>
													Множественный выбор
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<AnswersFieldArray qIndex={qIndex} />
						</div>
					))}
					<Button
						type='button'
						variant='outline'
						onClick={() =>
							appendQuestion({
								text: '',
								type: QuestionType.SINGLE_CHOICE,
								answers: [
									{ text: '', isCorrect: true },
									{ text: '', isCorrect: false },
								],
							})
						}
					>
						Добавить вопрос
					</Button>
				</div>

				<Button
					type='submit'
					disabled={
						createQuizMutation.isPending || updateQuizMutation.isPending
					}
				>
					{quiz ? 'Сохранить изменения' : 'Создать тест'}
				</Button>
			</form>
		</Form>
	)
}

function AnswersFieldArray({ qIndex }: { qIndex: number }) {
	const { control } = useFormContext<QuizFormValues>()
	const {
		fields: answersFields,
		append: appendAnswer,
		remove: removeAnswer,
	} = useFieldArray({
		control,
		name: `questions.${qIndex}.answers`,
	})

	return (
		<div className='ml-4 space-y-3 border-l pl-4'>
			<h5 className='font-medium'>Ответы</h5>
			{answersFields.map((answerField, aIndex) => (
				<div key={answerField.id} className='flex items-start gap-2'>
					<FormField
						control={control}
						name={`questions.${qIndex}.answers.${aIndex}.isCorrect`}
						render={({ field }) => (
							<FormItem className='flex items-center pt-2.5'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`questions.${qIndex}.answers.${aIndex}.text`}
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormControl>
									<Input placeholder={`Ответ ${aIndex + 1}`} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						onClick={() => removeAnswer(aIndex)}
					>
						<Trash className='h-4 w-4 text-destructive' />
					</Button>
				</div>
			))}
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => appendAnswer({ text: '', isCorrect: false })}
			>
				Добавить ответ
			</Button>
		</div>
	)
}