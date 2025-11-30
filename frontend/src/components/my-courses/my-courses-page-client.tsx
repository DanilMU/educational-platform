'use client'

import { motion } from 'framer-motion'
import { EnrolledSubjectsList } from './enrolled-subjects-list'

export function MyCoursesPageClient() {
	return (
		<div className='space-y-8'>
			<motion.h1
                className='text-3xl font-bold'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Мои курсы
            </motion.h1>
			<motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
			    <EnrolledSubjectsList />
            </motion.div>
		</div>
	)
}