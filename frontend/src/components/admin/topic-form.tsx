'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
	useCreateTopicMutation,
	useUpdateTopicMutation,
} from '@/src/api/hooks/useTopicMutations'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/src/components/ui/select'
import { useAdminCoursesQuery } from '@/src/api/hooks/useAdminCourses'
import { useAdminTopicsQuery } from '@/src/api/hooks/useAdminTopics'
import { MultiFileUpload } from '../ui/multi-file-upload'
import { uploadFile as originalUploadFile } from '@/src/api/requests/file'
import { Topic, CreateTopicDto, UpdateTopicDto } from '@/src/api/types'

// Wrapper to ensure the returned filePath is a non-nullable string
const uploadFile = async (file: File): Promise<{ filePath: string }> => {
	const result = await originalUploadFile(file)
	if (!result.filePath) {
		throw new Error('File upload failed: No file path returned.')
	}
	return { filePath: result.filePath }
}

const topicSchema = z.object({
	title: z.string().min(1, 'Название обязательно'),
	subjectId: z.string().min(1, 'Курс обязателен'),
	parentId: z.string().optional(),
	attachments: z.array(z.string()).optional(),
})

type TopicFormValues = z.infer<typeof topicSchema>

interface TopicFormProps {
	topic: Topic | null
	onSuccess: () => void
}

export function TopicForm({ topic, onSuccess }: TopicFormProps) {
	const createTopicMutation = useCreateTopicMutation()
	const updateTopicMutation = useUpdateTopicMutation()
	const { data: coursesData, isLoading: isLoadingCourses } = useAdminCoursesQuery({ take: 1000 })
	const courses = coursesData?.data;
	const { data: topicsData, isLoading: isLoadingTopics } = useAdminTopicsQuery(
		{}
	)

	const allTopics = topicsData?.data || []

	const form = useForm<TopicFormValues>({
		resolver: zodResolver(topicSchema),
		defaultValues: {
			title: topic?.title ?? '',
			subjectId: topic?.subjectId ?? '',
			parentId: (topic?.parentId as any)?.id || undefined,
			attachments: (topic as any)?.attachments ?? [],
		},
	})

	const onSubmit = (values: TopicFormValues) => {
		const data: CreateTopicDto | UpdateTopicDto = {
			...values,
			parentId:
				values.parentId === 'null-value' ? undefined : values.parentId,
			attachments: values.attachments,
		}

		if (topic) {
			updateTopicMutation.mutate(
				{ id: topic.id, data: data as UpdateTopicDto },
				{ onSuccess }
			)
		} else {
			createTopicMutation.mutate(data as CreateTopicDto, { onSuccess })
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название</FormLabel>
							<FormControl>
								<Input placeholder='Новая тема' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='subjectId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Курс</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								disabled={isLoadingCourses}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Выберите курс' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{isLoadingCourses ? (
										<div className='p-2 text-sm text-muted-foreground'>
											Загрузка курсов...
										</div>
									) : (
										courses?.map(course => (
											<SelectItem key={course.id} value={course.id}>
												{course.title}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='parentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Родительский раздел</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value || 'null-value'}
								disabled={isLoadingTopics}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Выберите родительский раздел (необязательно)' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{isLoadingTopics ? (
										<div className='p-2 text-sm text-muted-foreground'>
											Загрузка тем...
										</div>
									) : (
										<>
											<SelectItem value='null-value'>
												-- Нет (это раздел) --
											</SelectItem>
											{allTopics
												.filter(t => !t.parentId && t.id !== topic?.id) // Показываем только разделы и исключаем саму себя
												.map(parentTopic => (
													<SelectItem
														key={parentTopic.id}
														value={parentTopic.id}
													>
														{parentTopic.title}
													</SelectItem>
												))}
										</>
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='attachments'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Вложения</FormLabel>
							<FormControl>
								<MultiFileUpload
									value={field.value}
									onChange={field.onChange}
									uploadFile={uploadFile}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					disabled={
						createTopicMutation.isPending ||
						updateTopicMutation.isPending
					}
				>
					{topic ? 'Сохранить изменения' : 'Создать тему'}
				</Button>
			</form>
		</Form>
	)
}
