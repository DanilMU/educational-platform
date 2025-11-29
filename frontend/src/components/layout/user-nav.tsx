'use client'

import { Bell } from 'lucide-react'
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
import { ThemeSwitcher } from './theme-switcher'
import { Skeleton } from '../ui/skeleton'

export function UserNav() {
	const { data: profile, isLoading } = useGetProfileQuery()
	const { mutate: logout } = useLogoutMutation()

    if (isLoading) {
        return (
            <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-md" />
            </div>
        )
    }

	const fullName = profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'Пользователь'
	const userInitial = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : '?'

	return (
		<div className="flex items-center space-x-2 sm:space-x-4">
			<button
				type="button"
				className="p-2 text-muted-foreground hover:text-foreground"
				aria-label="Уведомления"
			>
				<Bell className="h-6 w-6" />
			</button>

			<ThemeSwitcher />

			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center space-x-2">
					<Avatar>
						<AvatarImage src={profile?.avatarUrl ?? undefined} alt="User Avatar" />
						<AvatarFallback>{userInitial}</AvatarFallback>
					</Avatar>
					<span className="hidden text-foreground sm:inline">{fullName}</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
                        <Link href="/dashboard">Профиль</Link>
                    </DropdownMenuItem>
					<DropdownMenuItem asChild>
                        <Link href="/settings">Настройки</Link>
                    </DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => logout()}>Выйти</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
