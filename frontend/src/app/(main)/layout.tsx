import { ReactNode } from 'react'
import { DashboardSidebar } from '@/src/components/layout/dashboard-sidebar'
import { MainContentHeader } from '@/src/components/layout/main-content-header'

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex min-h-screen'>
			<DashboardSidebar />
			<main className='flex-1 bg-gray-100'>
				<div className='flex flex-col p-8'>
					<MainContentHeader />
					<div className='mt-8'>{children}</div>
				</div>
			</main>
		</div>
	)
}
