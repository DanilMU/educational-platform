import type { Metadata } from 'next'
import { ProfileCard } from '@/src/components/dashboard/profile-card'
import { StatsGrid } from '@/src/components/dashboard/stats-grid'
import { PersonalDataForm } from '@/src/components/dashboard/personal-data-form'
import { SecuritySettings } from '@/src/components/dashboard/security-settings'

export const metadata: Metadata = {
	title: 'Профиль пользователя',
}

export default function DashboardPage() {
	return (
		<div className='space-y-8'>
			<ProfileCard />
			<StatsGrid />
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
				<PersonalDataForm />
				<SecuritySettings />
			</div>
		</div>
	)
}
