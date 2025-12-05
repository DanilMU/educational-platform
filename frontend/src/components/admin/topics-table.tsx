'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/src/components/ui/table'
import { useAdminTopicsQuery } from '@/src/api/hooks/useAdminTopics'
import {
	useCreateTopicMutation,
	useUpdateTopicMutation,
	useDeleteTopicMutation,
} from '@/src/api/hooks/useTopicMutations'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Button } from '@/src/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog'
import type { Topic } from '@/src/api/types'

const LazyTopicForm = dynamic(() => import('./lazy-topic-form'), {
	ssr: false,
})

export function TopicsTable() {
	// Fetch all topics by not passing skip/take
	const { data, isLoading, isError } = useAdminTopicsQuery({})
	const topics = data?.data || []
	const deleteTopicMutation = useDeleteTopicMutation()
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

	const hierarchicalTopics = useMemo(() => {
		const topicMap: Record<string, Topic & { children: Topic[] }> = {}
		const topLevelTopics: (Topic & { children: Topic[] })[] = []

		// Initialize map and children array
		topics.forEach(topic => {
			topicMap[topic.id] = { ...topic, children: [] }
		})

		// Populate children and identify top-level topics
		topics.forEach(topic => {
			const parentId = (topic.parentId as any)?.id
			if (parentId && topicMap[parentId]) {
				topicMap[parentId].children.push(topicMap[topic.id])
			} else {
				topLevelTopics.push(topicMap[topic.id])
			}
		})

		return topLevelTopics
	}, [topics])

	const handleEdit = (topic: Topic) => {
		setSelectedTopic(topic)
		setIsFormOpen(true)
	}

	const handleCreate = () => {
		setSelectedTopic(null)
		setIsFormOpen(true)
	}

	const handleDelete = (id: string) => {
		deleteTopicMutation.mutate(id)
	}

	if (isLoading) {
		return (
			<div className='rounded-lg border bg-card p-4'>
				<Skeleton className='mb-4 h-10 w-full' />
				<Skeleton className='mb-2 h-10 w-full' />
				<Skeleton className='mb-2 h-10 w-full' />
				<Skeleton className='h-10 w-full' />
			</div>
		)
	}

	if (isError) {
		return <div className='text-red-500'>Ошибка загрузки тем.</div>
	}

	return (
		<>
			<div className='mb-4 flex justify-end'>
				<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
					<DialogTrigger asChild>
						<Button onClick={handleCreate}>
							<PlusCircle className='mr-2 h-4 w-4' />
							Создать тему/раздел
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{selectedTopic
									? 'Редактировать тему/раздел'
									: 'Создать тему/раздел'}
							</DialogTitle>
						</DialogHeader>
						<LazyTopicForm
							topic={selectedTopic}
							onSuccess={() => setIsFormOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>
			<div className='rounded-lg border bg-card'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Название</TableHead>
							<TableHead>Курс</TableHead>
							<TableHead className='text-right'>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{hierarchicalTopics.map(topic => (
							<React.Fragment key={topic.id}>
								<TableRow className='bg-muted/50'>
									<TableCell className='font-semibold'>
										{topic.title}
									</TableCell>
									<TableCell>{topic.subjectId}</TableCell>
									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant='ghost' className='h-8 w-8 p-0'>
													<span className='sr-only'>
														Открыть меню
													</span>
													<MoreHorizontal className='h-4 w-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuItem
													onClick={() => handleEdit(topic)}
												>
													Редактировать
												</DropdownMenuItem>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<DropdownMenuItem
															onSelect={e =>
																e.preventDefault()
															}
														>
															Удалить
														</DropdownMenuItem>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Вы уверены?
															</AlertDialogTitle>
															<AlertDialogDescription>
																Это действие нельзя отменить.
																Раздел и все вложенные темы будут
																удалены.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>
																Отмена
															</AlertDialogCancel>
															<AlertDialogAction
																onClick={() =>
																	handleDelete(topic.id)
																}
															>
																Удалить
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								{topic.children.map(child => (
									<TableRow key={child.id}>
										<TableCell className='pl-8'>
											{child.title}
										</TableCell>
										<TableCell>{child.subjectId}</TableCell>
										<TableCell className='text-right'>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														className='h-8 w-8 p-0'
													>
														<span className='sr-only'>
															Открыть меню
														</span>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem
														onClick={() => handleEdit(child)}
													>
														Редактировать
													</DropdownMenuItem>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<DropdownMenuItem
																onSelect={e =>
																	e.preventDefault()
																}
															>
																Удалить
															</DropdownMenuItem>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Вы уверены?
																</AlertDialogTitle>
																<AlertDialogDescription>
																	Это действие нельзя отменить.
																	Тема будет удалена навсегда.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>
																	Отмена
																</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() =>
																		handleDelete(child.id)
																	}
																>
																	Удалить
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
