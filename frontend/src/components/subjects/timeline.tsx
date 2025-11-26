'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock } from 'lucide-react'

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
		<div className="relative">
			<div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-blue-800 to-purple-500" />

			{topics.map((topic, index) => (
				<motion.div
					key={topic.id}
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="relative mb-8 flex items-start gap-8"
				>
					<div className="z-10 flex size-16 items-center justify-center rounded-full border-4 border-blue-800 bg-white">
						{completedTopics[index] ? (
							<CheckCircle className="size-8 text-blue-800" />
						) : (
							<Circle className="size-8 text-gray-400" />
						)}
					</div>

					<div className="flex-1 pt-1">
						<h3 className="text-lg font-semibold">{topic.title}</h3>
						<p className="text-sm text-muted-foreground">
							{topic.lessons?.length || 0} уроков
						</p>

						<div className="mt-4 space-y-2">
							{topic.lessons?.map(lesson => (
								<div
									key={lesson.id}
									className={`flex items-center gap-2 text-sm ${
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
								</div>
							))}
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}