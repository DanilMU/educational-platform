'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Progress } from '@/src/components/ui/progress'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { BookOpen, Users, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { Subject } from '@/src/api/types'

interface EnrolledSubjectCardProps {
	subject: Subject
}

export function EnrolledSubjectCard({ subject }: EnrolledSubjectCardProps) {
	// В реальной реализации прогресс будет получаться из данных пользователя
	const progress = 0 // Заглушка - в реальности нужно получать прогресс пользователя по курсу

	return (
		<Card className='h-full flex-col overflow-hidden transition-all hover:shadow-lg'>
			<div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
				<CardHeader className='p-0 text-white'>
					<CardTitle className='flex items-center gap-2 text-lg'>
						<BookOpen className='h-5 w-5' />
						{subject.title}
					</CardTitle>
					<CardDescription className='text-blue-100'>
						{subject.description
							? (JSON.stringify(subject.description).length > 100
								? JSON.stringify(subject.description).substring(0, 100) + '...'
								: JSON.stringify(subject.description))
							: 'Описание отсутствует'}
					</CardDescription>
				</CardHeader>
			</div>
			<CardContent className='p-4 flex-1 flex flex-col'>
				<div className='space-y-4'>
					<div className='flex items-center justify-between text-sm text-muted-foreground'>
						<div className='flex items-center gap-1'>
							<BookOpen className='h-4 w-4' />
							<span>{subject.topics?.length || 0} тем</span>
						</div>
						<div className='flex items-center gap-1'>
							<Calendar className='h-4 w-4' />
							<span>{new Date(subject.createdAt).toLocaleDateString()}</span>
						</div>
					</div>
					
					<div className='pt-2'>
						<div className='flex justify-between text-sm mb-1'>
							<span className='text-muted-foreground'>Прогресс</span>
							<span className='font-medium'>{progress}%</span>
						</div>
						<Progress value={progress} className='h-2' />
					</div>
				</div>
				
				<Button asChild className='mt-auto w-full mt-4'>
					<Link href={`/subjects/${subject.id}`}>Продолжить обучение</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

export function EnrolledSubjectCardSkeleton() {
	return (
		<Card className='h-full flex flex-col overflow-hidden animate-pulse'>
			<div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
				<CardHeader className='p-0 text-white'>
					<CardTitle className='flex items-center gap-2 text-lg'>
						<div className='h-5 w-5 bg-blue-300 rounded'></div>
						<div className='h-6 w-3/4 bg-blue-300 rounded'></div>
					</CardTitle>
					<CardDescription className='text-blue-100 mt-2'>
						<div className='h-4 w-full bg-blue-300 rounded'></div>
					</CardDescription>
				</CardHeader>
			</div>
			<CardContent className='p-4 flex-1 flex flex-col'>
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1'>
							<div className='h-4 w-4 bg-gray-300 rounded'></div>
							<div className='h-3 w-16 bg-gray-300 rounded'></div>
						</div>
						<div className='flex items-center gap-1'>
							<div className='h-4 w-4 bg-gray-300 rounded'></div>
							<div className='h-3 w-12 bg-gray-300 rounded'></div>
						</div>
					</div>
					
					<div className='pt-2'>
						<div className='flex justify-between text-sm mb-1'>
							<div className='h-3 w-16 bg-gray-300 rounded'></div>
							<div className='h-3 w-8 bg-gray-300 rounded'></div>
						</div>
						<div className='h-2 bg-gray-300 rounded-full'></div>
					</div>
					
					<div className='flex flex-wrap gap-2 pt-2'>
						<div className='h-6 w-12 bg-gray-300 rounded-full'></div>
						<div className='h-6 w-16 bg-gray-300 rounded-full'></div>
					</div>
				</div>
				
				<div className='mt-auto w-full mt-4 h-10 bg-gray-300 rounded'></div>
			</CardContent>
		</Card>
	)
}