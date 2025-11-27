'use client'

import { SubjectList } from '@/src/components/subjects/subject-list'
import { motion } from 'framer-motion'

export function SubjectsPageClient() {
	return (
		<div className='space-y-8'>
			<motion.h1
                className='text-3xl font-bold'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Все курсы
            </motion.h1>
			<motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
			    <SubjectList />
            </motion.div>
		</div>
	)
}
