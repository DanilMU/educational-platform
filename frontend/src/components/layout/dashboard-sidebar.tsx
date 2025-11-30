'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	LayoutDashboard,
	BookOpenText,
	ShieldQuestion,
	Settings,
} from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { useGetProfileQuery } from '@/src/api/hooks'

const navLinks = [
	{
		href: '/dashboard',
		icon: LayoutDashboard,
		label: 'Профиль',
	},
	{
		href: '/my-courses',
		icon: BookOpenText,
		label: 'Курсы',
	},
	{
		href: '/settings',
		icon: Settings,
		label: 'Настройки',
	},
	{
		href: '/admin',
		icon: ShieldQuestion,
		label: 'Админка',
		adminOnly: true, // This link will only be shown to admins
	},
]

export function DashboardSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
	const pathname = usePathname()
	const { data: profile } = useGetProfileQuery()

	const isAdmin = profile?.role === 'ADMIN'

	return (
		<aside className='flex h-full w-full flex-col justify-between bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 p-6 text-white'>
			<div>
				<Link
					href='/'
					className='mb-8 flex items-center space-x-2'
					onClick={onLinkClick}
				>
					<Image
						src='/images/logo/logo3.svg' // Placeholder logo
						alt='Образовательная Платформа'
						width={32}
						height={32}
					/>
					<span className='text-xl font-bold'>Образовательная Платформа</span>
				</Link>
				<nav className='space-y-4'>
					{navLinks.map((link) => {
						if (link.adminOnly && !isAdmin) {
							return null
						}
						const isActive = pathname.startsWith(link.href)
						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={onLinkClick}
								className={cn(
									'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
									isActive
										? 'bg-white/10 text-white'
										: 'text-gray-400 hover:bg-white/5 hover:text-white'
								)}
							>
								<link.icon className='h-5 w-5' />
								<span>{link.label}</span>
							</Link>
						)
					})}
				</nav>
			</div>
			<div className='text-sm text-gray-400'>
				&copy; {new Date().getFullYear()} Платформа
			</div>
		</aside>
	)
}
