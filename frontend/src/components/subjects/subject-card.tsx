'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { Progress } from '@/src/components/ui/progress'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/src/components/ui/skeleton'

// I'll assume the subject type based on the usage in the card.
// This should be replaced with the actual type from the API client later.
type Subject = {
	id: string
	title: string
	description: string
	progress?: number
	lessons?: number | string
	category?: string
}

interface SubjectCardProps {
	subject: Subject
}

export function SubjectCard({ subject }: SubjectCardProps) {
	const description =
		subject.description.length > 100
			? subject.description.slice(0, 100) + '...'
			: subject.description

	return (
		<motion.div
			whileHover={{ y: -8 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className="group relative h-full overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-2xl"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
			<Card className="relative flex h-full flex-col">
				<CardHeader className="flex-row items-start gap-4">
					<div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
						<BookOpen className="size-6 text-white" />
					</div>
					<div>
						<CardTitle className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
							{subject.title}
						</CardTitle>
						<div className="mt-1 flex items-center gap-2">
							{subject.category && <Badge variant="secondary">{subject.category}</Badge>}
							{subject.lessons && (
								<span className="text-sm text-muted-foreground">
									{subject.lessons} уроков
								</span>
							)}
						</div>
					</div>
				</CardHeader>

				<CardContent className="flex-grow space-y-4">
					{subject.progress !== undefined && (
						<Progress value={subject.progress} className="h-2" />
					)}
					<p className="text-sm text-muted-foreground line-clamp-3">
						{description}
					</p>
				</CardContent>

				<CardFooter>
					<Button asChild className="w-full group-hover:bg-blue-600">
						<Link href={`/subjects/${subject.id}`}>
							Продолжить обучение
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</motion.div>
	)
}

export function SubjectCardSkeleton() {
	return (
	  <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
			<div className="p-6">
				<div className="flex-row items-start gap-4 flex">
					<Skeleton className="h-12 w-12 rounded-lg" />
					<div className="flex-grow">
						<Skeleton className="h-5 w-3/4" />
						<div className="mt-2 flex items-center gap-2">
							<Skeleton className="h-4 w-1/4" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					</div>
				</div>
				<div className="mt-4 space-y-4">
					<Skeleton className="h-2 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<div className="mt-6">
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
	  </div>
	)
}