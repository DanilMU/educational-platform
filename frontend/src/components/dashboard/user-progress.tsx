'use client'

import { useGetUserProgressQuery } from '@/src/api/hooks'
import { Award, BookCheck, BookCopy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'




export function UserProgress() {
	const { data: progress, isLoading } = useGetUserProgressQuery()
	
	// Рассчитываем статистику на основе данных о прогрессе
	const calculateStats = () => {
		if (!progress || !Array.isArray(progress)) {
			return {
				inProgressSubjects: 0,
				completedSubjects: 0,
				certificatesCount: 0
			};
		}
		
		// Здесь должны быть вычисления на основе реальных данных
		// Но поскольку у нас нет информации о предметах в объекте Progress,
		// мы возвращаем нулевые значения, чтобы избежать ошибок
		return {
			inProgressSubjects: 0,
			completedSubjects: 0,
			certificatesCount: 0
		};
	};
	
	const statsData = calculateStats();

	const stats = [
		{
			name: 'В процессе',
			value: statsData.inProgressSubjects,
			icon: BookCopy
		},
		{
			name: 'Завершено',
			value: statsData.completedSubjects,
			icon: BookCheck
		},
		{
			name: 'Сертификаты',
			value: statsData.certificatesCount,
			icon: Award
		}
	]

	return (
		<Card className='border-0 shadow-xs'>
			<CardHeader>
				<CardTitle className='text-lg font-semibold'>
					Ваш прогресс
				</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className='space-y-4'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className='flex items-center justify-between'
							>
								<div className='flex items-center gap-3'>
									<Skeleton className='size-8 rounded-full' />
									<Skeleton className='h-4 w-24' />
								</div>
								<Skeleton className='h-6 w-8' />
							</div>
						))}
					</div>
				) : (
					<ul className='space-y-4'>
						{stats.map(stat => (
							<li
								key={stat.name}
								className='flex items-center justify-between'
							>
								<div className='flex items-center gap-3'>
									<div className='flex size-8 items-center justify-center rounded-full bg-muted'>
										<stat.icon className='size-5 text-muted-foreground' />
									</div>
									<span className='font-medium text-foreground'>
										{stat.name}
									</span>
								</div>
								<span className='text-lg font-bold text-foreground'>
									{stat.value ?? 0}
								</span>
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}
