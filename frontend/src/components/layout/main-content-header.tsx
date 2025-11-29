'use client'

import { Search } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { ResponsiveNavigation } from './responsive-navigation'
import { UserNav } from './user-nav'

export function MainContentHeader() {
	return (
		<header className="flex items-center justify-between space-x-4 rounded-lg bg-card p-4 shadow-sm">
			<div className="flex flex-1 items-center gap-4">
				<ResponsiveNavigation />
				<div className="relative hidden flex-1 items-center md:flex">
					<Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
					<Input
						placeholder="Поиск курсов, уроков..."
						className="w-full pl-10 pr-4"
					/>
				</div>
			</div>

			<UserNav />
		</header>
	)
}
