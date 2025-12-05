'use client'

import { memo, useState } from 'react'
import Link from 'next/link'
import {
	useEnrollInSubjectMutation
} from '@/src/api/hooks'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/src/components/ui/card' // Explicitly import CardFooter
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	Clock,
	Users,
	Star,
	PlayCircle,
	BookOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Progress } from '@/src/components/ui/progress'
import { Skeleton } from '@/src/components/ui/skeleton'
import { MagicCard } from '@/src/components/ui/magic-card' // Import MagicCard

import type { Subject as ApiSubject, SubjectDescription } from '@/src/api/types'

type Subject = ApiSubject & {
	progress?: number
	lessonsCount?: number
	studentCount?: number
	rating?: number
	isEnrolled?: boolean
	category?: string
}

interface SubjectCardProps {
	subject: Subject
}

const SubjectCard = memo(({ subject }: SubjectCardProps) => {
	const enrollMutation = useEnrollInSubjectMutation();
	const [isHovered] = useState(false);

	const handleEnroll = async (e: React.MouseEvent) => {
		e.preventDefault(); // Предотвращаем переход по ссылке
		enrollMutation.mutate(subject.id);
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case 'programming':
				return 'bg-blue-100 text-blue-800'
			case 'design':
				return 'bg-purple-100 text-purple-800'
			case 'data-science':
				return 'bg-green-100 text-green-800'
			case 'business':
				return 'bg-orange-100 text-orange-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getCategoryName = (category: string) => {
		switch (category) {
			case 'programming':
				return 'Программирование'
			case 'design':
				return 'Дизайн'
			case 'data-science':
				return 'Data Science'
			case 'business':
				return 'Бизнес'
			default:
				return 'Другое'
		}
	}

	const description =
		String(subject.description || '').length > 100
			? String(subject.description || '').slice(0, 100) + '...'
			: String(subject.description || '')

	return (
		<MagicCard
			className='group relative h-full overflow-hidden rounded-xl border'
			gradientColor='#3b82f6' // Example gradient color
			gradientOpacity={0.3}
			gradientSize={200}
		>
			<CardHeader className='pb-3'>
				<div className='flex items-start justify-between'>
					<div className='flex-1'>
						<CardTitle className='text-lg line-clamp-2'>
							{subject.title}
						</CardTitle>
						<CardDescription className='mt-1 line-clamp-2'>
							{description}
						</CardDescription>
					</div>
				</div>

				{subject.category && (
					<Badge className={getCategoryColor(subject.category)}>
						{getCategoryName(subject.category)}
					</Badge>
				)}
			</CardHeader>

			<CardContent className='flex-grow space-y-3'>
				<div className='flex items-center justify-between text-sm text-gray-600'>
					<div className='flex items-center gap-1'>
						<Clock className='w-4 h-4' />
						<span>{subject.lessonsCount || 0} уроков</span>
					</div>
					<div className='flex items-center gap-1'>
						<Users className='w-4 h-4' />
						<span>{subject.studentCount || 0} студентов</span>
					</div>
				</div>

				<div className='flex items-center justify-between text-sm'>
					{subject.rating !== undefined && (
						<div className='flex items-center gap-1'>
							<Star className='w-4 h-4 text-yellow-500 fill-current' />
							<span>{subject.rating.toFixed(1)}</span>
						</div>
					)}
				</div>

				{subject.progress !== undefined && (
					<Progress value={subject.progress} className='h-2' />
				)}
			</CardContent>

			<CardFooter className="flex flex-col gap-2">
				{subject.isEnrolled ? (
					<Button className='w-full' asChild size='sm'>
						<Link href={`/subjects/${subject.id}`}>
							<PlayCircle className='w-4 h-4 mr-2' />
							Продолжить обучение
						</Link>
					</Button>
				) : (
					<>
						<Button
							onClick={handleEnroll}
							disabled={enrollMutation.isPending}
							className='w-full'
							size='sm'
						>
							{enrollMutation.isPending ? (
								<>
									<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
									Записываем...
								</>
							) : (
								<>
									<BookOpen className='w-4 h-4 mr-2' />
									Записаться на курс
								</>
							)}
						</Button>
						<Button className='w-full' variant="outline" asChild size='sm'>
							<Link href={`/subjects/${subject.id}`}>
								Просмотреть
							</Link>
						</Button>
					</>
				)}
			</CardFooter>
		</MagicCard>
	)
})

SubjectCard.displayName = 'SubjectCard'

export { SubjectCard }

export function SubjectCardSkeleton() {
	return (
		<div className='overflow-hidden rounded-xl border bg-card shadow-lg'>
			<div className='p-6'>
				<div className='flex-row items-start gap-4 flex'>
					<Skeleton className='h-12 w-12 rounded-lg' />
					<div className='flex-grow'>
						<Skeleton className='h-5 w-3/4' />
						<div className='mt-2 flex items-center gap-2'>
							<Skeleton className='h-4 w-1/4' />
							<Skeleton className='h-4 w-1/2' />
						</div>
					</div>
				</div>
				<div className='mt-4 space-y-4'>
					<Skeleton className='h-2 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-5/6' />
				</div>
				<div className='mt-6'>
					<Skeleton className='h-10 w-full' />
				</div>
			</div>
		</div>
	)
}