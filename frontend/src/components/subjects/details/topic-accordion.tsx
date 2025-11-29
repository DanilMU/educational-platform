'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion'
import type { Topic } from '@/src/api/types/topic'
import { FileText } from 'lucide-react'
import Link from 'next/link'

interface TopicAccordionProps {
	topics: Topic[]
}

export function TopicAccordion({ topics }: TopicAccordionProps) {
	if (!topics || topics.length === 0) {
		return <p className='text-muted-foreground'>Темы для этого курса еще не добавлены.</p>
	}

	return (
		<Accordion type='multiple' className='w-full'>
			{topics.map(topic => {
				const uniqueLessons = topic.lessons
					? Array.from(
							new Map(topic.lessons.map(lesson => [lesson.id, lesson])).values()
						)
					: []

				return (
					<AccordionItem key={topic.id} value={`topic-${topic.id}`}>
						<AccordionTrigger className='text-lg font-semibold'>
							{topic.title}
						</AccordionTrigger>
						<AccordionContent>
							{uniqueLessons.length > 0 ? (
								<ul className='space-y-2'>
									{uniqueLessons.map(lesson => (
										<li key={lesson.id}>
											<Link
												href={`/lessons/${lesson.id}`}
												className='flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent'
											>
												<FileText className='size-5 text-muted-foreground' />
												<span className='text-foreground'>{lesson.title}</span>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className='text-sm text-muted-foreground'>
									Уроки для этой темы еще не добавлены.
								</p>
							)}
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}
