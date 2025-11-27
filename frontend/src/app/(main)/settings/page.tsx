'use client'

import { PersonalDataForm } from '@/src/components/dashboard/personal-data-form'
import { SecuritySettings } from '@/src/components/dashboard/security-settings'
import { motion } from 'framer-motion'

export default function SettingsPage() {
	return (
		<div className="space-y-8">
			<motion.h1
				className="text-3xl font-bold"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Настройки
			</motion.h1>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<motion.div
					className="lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<PersonalDataForm />
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<SecuritySettings />
				</motion.div>
			</div>
		</div>
	)
}
