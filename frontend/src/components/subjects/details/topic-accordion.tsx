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
		return <p className='text-gray-500'>Темы для этого курса еще не добавлены.</p>
	}

	return (
		<Accordion type='multiple' className='w-full'>
			{topics.map(topic => (
				<AccordionItem key={topic.id} value={`topic-${topic.id}`}>
					<AccordionTrigger className='text-lg font-semibold'>
						{topic.title}
					</AccordionTrigger>
					<AccordionContent>
						{topic.lessons && topic.lessons.length > 0 ? (
							<ul className='space-y-2'>
								{topic.lessons.map(lesson => (
									<li key={lesson.id}>
										<Link
											href={`/lessons/${lesson.id}`}
											className='flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-100'
										>
											<FileText className='size-5 text-gray-500' />
											<span className='text-gray-700'>{lesson.title}</span>
										</Link>
									</li>
								))}
							</ul>
						) : (
							<p className='text-sm text-gray-500'>
								Уроки для этой темы еще не добавлены.
							</p>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
