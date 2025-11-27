'use client'

import { Bell, Moon, Search, Sun } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { ResponsiveNavigation } from './responsive-navigation'

import { useGetProfileQuery, useLogoutMutation } from '@/src/api/hooks'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import Link from 'next/link'

export function MainContentHeader() {
	const { data: profile } = useGetProfileQuery()
	const { mutate: logout } = useLogoutMutation()

	const fullName = profile?.firstName ? `${profile.firstName} ${profile.lastName}`.trim() : 'Пользователь'
	const userInitial = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : '?'

	return (
		<header className="flex items-center justify-between space-x-4 rounded-lg bg-white p-4 shadow-sm">
			<div className="flex flex-1 items-center gap-4">
				<ResponsiveNavigation />
				<div className="relative hidden flex-1 items-center md:flex">
					<Search className="absolute left-3 h-5 w-5 text-gray-400" />
					<Input
						placeholder="Поиск курсов, уроков..."
						className="w-full pl-10 pr-4"
					/>
				</div>
			</div>

			<div className="flex items-center space-x-2 sm:space-x-4">
				<button
					type="button"
					className="p-2 text-gray-600 hover:text-gray-900"
					aria-label="Уведомления"
				>
					<Bell className="h-6 w-6" />
				</button>
				<button
					type="button"
					className="p-2 text-gray-600 hover:text-gray-900"
					aria-label="Сменить тему"
				>
					<Moon className="hidden h-6 w-6 dark:block" />
					<Sun className="block h-6 w-6 dark:hidden" />
				</button>

				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center space-x-2">
						<Avatar>
							<AvatarImage src={profile?.avatarUrl} alt="User Avatar" />
							<AvatarFallback>{userInitial}</AvatarFallback>
						</Avatar>
						<span className="hidden text-gray-800 sm:inline">{fullName}</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href="/dashboard">
							<DropdownMenuItem>Профиль</DropdownMenuItem>
						</Link>
						<Link href="/settings">
							<DropdownMenuItem>Настройки</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => logout()}>Выйти</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
