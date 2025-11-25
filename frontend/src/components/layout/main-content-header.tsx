'use client'

import { Bell, Moon, Search, Sun } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { ResponsiveNavigation } from './responsive-navigation'

import { useGetProfileQuery } from '@/src/api/hooks'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'

export function MainContentHeader() {
	const { data: profile } = useGetProfileQuery()

	// Явная проверка типов для firstName, lastName и avatarUrl
	let firstName = ''
	let lastName = ''
	let avatarUrl = ''

	if (profile) {
		// Обработка firstName
		if (typeof profile.firstName === 'string') {
			firstName = profile.firstName
		} else if (profile.firstName && typeof profile.firstName === 'object') {
			// Если firstName объект, пытаемся получить строковое значение
			// В реальности это может быть объект, содержащий строковое значение
			firstName =
				JSON.stringify(profile.firstName) !== '{}'
					? JSON.stringify(profile.firstName)
					: ''
		}

		// Обработка lastName
		if (typeof profile.lastName === 'string') {
			lastName = profile.lastName
		} else if (profile.lastName && typeof profile.lastName === 'object') {
			lastName =
				JSON.stringify(profile.lastName) !== '{}'
					? JSON.stringify(profile.lastName)
					: ''
		}

		// Обработка avatarUrl
		if (typeof profile.avatarUrl === 'string') {
			avatarUrl = profile.avatarUrl
		} else if (profile.avatarUrl && typeof profile.avatarUrl === 'object') {
			// Пытаемся получить строковое значение из объекта avatarUrl
			avatarUrl =
				JSON.stringify(profile.avatarUrl) !== '{}'
					? JSON.stringify(profile.avatarUrl)
					: ''
		}
	}

	const fullName = firstName ? `${firstName} ${lastName}`.trim() : 'Пользователь'
	const userInitial = firstName ? firstName.charAt(0).toUpperCase() : '?'

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
							<AvatarImage src={avatarUrl} alt="User Avatar" />
							<AvatarFallback>{userInitial}</AvatarFallback>
						</Avatar>
						<span className="hidden text-gray-800 sm:inline">{fullName}</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Профиль</DropdownMenuItem>
						<DropdownMenuItem>Настройки</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Выйти</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
