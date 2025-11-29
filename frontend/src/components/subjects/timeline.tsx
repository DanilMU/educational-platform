'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import Link from 'next/link'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion'

// These types should be replaced with actual types from the API client.
type Lesson = {
	id: string
	title: string
}

type Topic = {
	id: string
	title: string
	lessons?: Lesson[]
}

interface TimelineProps {
	topics: Topic[]
	completedLessons: string[]
}

export function Timeline({ topics, completedLessons }: TimelineProps) {
	// A simple check to see which topics are completed.
	// A topic is completed if all its lessons are completed.
	const completedTopics = topics.map(topic => {
		if (!topic.lessons || topic.lessons.length === 0) return false
		return topic.lessons.every(lesson => completedLessons.includes(lesson.id))
	})

	return (
		<Accordion type="multiple" className="w-full">
			{topics.map((topic, index) => (
				<motion.div
					key={topic.id}
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<AccordionItem value={`topic-${topic.id}`} className="mb-4 border-none">
						<AccordionTrigger className="flex w-full items-center justify-start gap-8 rounded-lg bg-muted/50 p-4 hover:bg-accent">
							<div className="z-10 flex size-16 items-center justify-center rounded-full border-4 border-primary bg-card">
								{completedTopics[index] ? (
									<CheckCircle className="size-8 text-primary" />
								) : (
									<Circle className="size-8 text-muted-foreground" />
								)}
							</div>
							<div className="text-left">
								<h3 className="text-lg font-semibold">{topic.title}</h3>
								<p className="text-sm text-muted-foreground">
									{topic.lessons?.length || 0} уроков
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className="p-4">
							<div className="space-y-2">
								{topic.lessons?.map(lesson => (
									<Link
										key={lesson.id}
										href={`/lessons/${lesson.id}`}
										className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-accent ${
											completedLessons.includes(lesson.id)
												? 'text-green-600'
												: 'text-muted-foreground'
										}`}
									>
										{completedLessons.includes(lesson.id) ? (
											<CheckCircle className="size-4" />
										) : (
											<Circle className="size-4" />
										)}
										<span>{lesson.title}</span>
										<div className="flex-grow" />
										<Clock className="size-3" />
									</Link>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</motion.div>
			))}
		</Accordion>
	)
}