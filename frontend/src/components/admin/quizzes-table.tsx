'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/src/components/ui/table'
import { useAdminQuizzesQuery } from '@/src/api/hooks/useAdminQuizzes'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Button } from '@/src/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import { useState } from 'react'
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
import type { Quiz } from '@/src/api/types'

import LazyQuizForm from './lazy-quiz-form'

export function QuizzesTable() {
	const { data: quizzes, isLoading, isError } = useAdminQuizzesQuery()
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

	const handleEdit = (quiz: Quiz) => {
		setSelectedQuiz(quiz)
		setIsFormOpen(true)
	}

	const handleCreate = () => {
		setSelectedQuiz(null)
		setIsFormOpen(true)
	}

	const handleDelete = (id: string) => {
		// deleteQuizMutation.mutate(id);
		console.log('delete', id)
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
		return <div className='text-red-500'>Ошибка загрузки тестов.</div>
	}

	return (
		<>
			<div className='mb-4 flex justify-end'>
				<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
					<DialogTrigger asChild>
						<Button onClick={handleCreate}>
							<PlusCircle className='mr-2 h-4 w-4' />
							Создать тест
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-4xl'>
						<DialogHeader>
							<DialogTitle>
								{selectedQuiz ? 'Редактировать тест' : 'Создать тест'}
							</DialogTitle>
						</DialogHeader>
						<LazyQuizForm
							quiz={selectedQuiz}
							onSuccess={() => setIsFormOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>
			<div className='rounded-lg border bg-card'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Название теста</TableHead>
							<TableHead>ID урока</TableHead>
							<TableHead className='text-right'>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{quizzes?.map(quiz => (
							<TableRow key={quiz.id}>
								<TableCell>{quiz.title}</TableCell>
								<TableCell>{quiz.lessonId}</TableCell>
								<TableCell className='text-right'>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' className='h-8 w-8 p-0'>
												<span className='sr-only'>Открыть меню</span>
												<MoreHorizontal className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuItem onClick={() => handleEdit(quiz)}>
												Редактировать
											</DropdownMenuItem>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<DropdownMenuItem
														onSelect={e => e.preventDefault()}
													>
														Удалить
													</DropdownMenuItem>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
														<AlertDialogDescription>
															Это действие нельзя отменить. Тест будет
															удален навсегда.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Отмена</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(quiz.id)}
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
					</TableBody>
				</Table>
			</div>
		</>
	)
}
