'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Subject } from '@/src/api/types/subject'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

interface SubjectCardProps {
	subject: Subject
}

export function SubjectCard({ subject }: SubjectCardProps) {
	// Helper function to safely extract description
	const getDescription = (description: any): string => {
		if (!description) return 'Описание отсутствует.'
		if (typeof description === 'string') return description
		if (typeof description === 'object' && description !== null) {
			// Try to find a meaningful value
			return String(Object.values(description)[0] || 'Описание в виде объекта.');
		}
		return 'Неверный формат описания.';
	}

	return (
		<Card className='flex flex-col'>
			<CardHeader className='flex-row items-center gap-4'>
				<div className='flex size-12 items-center justify-center rounded-lg bg-blue-100'>
					<BookOpen className='size-6 text-blue-600' />
				</div>
				<CardTitle className='text-lg font-semibold'>
					{subject.title}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex-grow'>
				<p className='text-sm text-gray-600'>
					{getDescription(subject.description)}
				</p>
			</CardContent>
			<CardFooter>
				<Button asChild className='w-full'>
					<Link href={`/subjects/${subject.id}`}>Перейти к курсу</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export function SubjectCardSkeleton() {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='flex-row items-center gap-4'>
				<Skeleton className='size-12 rounded-lg' />
				<Skeleton className='h-6 w-2/3' />
			</CardHeader>
			<CardContent className='flex-grow space-y-2'>
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-5/6' />
			</CardContent>
			<CardFooter>
				<Skeleton className='h-10 w-full' />
			</CardFooter>
		</Card>
	)
}
