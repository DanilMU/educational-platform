'use client'

import { Book, ChevronRight } from 'lucide-react'
import Link from 'next/link'




import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { useAuth } from '@/src/hooks/useAuth'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'


export function EnrolledSubjects() {
	const { user } = useAuth();
	const { data: subjects = [], isLoading } = useGetEnrolledSubjectsQuery(user?.id || '')

	if (isLoading) {
		return (
			<Card className='border-0 shadow-xs'>
				<CardHeader>
					<CardTitle className='text-lg font-semibold'>
						Мои курсы
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className='flex items-center justify-between rounded-lg border p-4'
							>
								<div className='flex items-center gap-4'>
									<Skeleton className='size-10 rounded-lg' />
									<div className='space-y-1'>
										<Skeleton className='h-4 w-32' />
										<Skeleton className='h-3 w-48' />
									</div>
								</div>
								<Skeleton className='size-8 rounded-full' />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className='border-0 shadow-xs'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-lg font-semibold'>
						Мои курсы
					</CardTitle>
					<Button variant='ghost' size='sm' asChild>
						<Link href='/subjects'>Все курсы</Link>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{subjects && subjects.length > 0 ? (
					<ul className='space-y-4'>
						{subjects.map(subject => (
							<li key={subject.id}>
								<Link
									href={`/subjects/${subject.id}`}
									className='block rounded-lg border p-4 transition-all hover:bg-accent hover:shadow-sm'
								>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-4'>
											<div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
												<Book className='size-5 text-primary' />
											</div>
											<div>
												<h4 className='font-semibold text-foreground'>
													{subject.title || 'Без названия'}
												</h4>
												<p className='text-sm text-muted-foreground'>
													Прогресс: 0%
												</p>
											</div>
										</div>
										<ChevronRight className='size-5 text-muted-foreground' />
									</div>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<div className='py-12 text-center'>
						<Book className='mx-auto mb-4 size-12 text-gray-300' />
						<h3 className='mb-2 text-lg font-semibold text-gray-900'>
							Вы еще не записаны на курсы
						</h3>
						<p className='mb-6 text-gray-600'>
							Начните свое обучение, выбрав один из доступных
							курсов.
						</p>
						<Button asChild>
							<Link href='/subjects'>Перейти к курсам</Link>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
