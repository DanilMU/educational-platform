'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/src/components/ui/button'
import { Pencil } from 'lucide-react'
import { useGetProfileQuery } from '@/src/api/hooks'

export function ProfileSummaryCard() {
	const { data: profile } = useGetProfileQuery()

	const fullName = profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'Пользователь';
	const userInitial = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : '?';

	return (
		<div className='rounded-lg bg-white p-6 shadow-sm'>
			<div className='flex items-center space-x-4'>
				<Avatar className='h-24 w-24'>
					<AvatarImage src={profile?.avatarUrl || ''} alt='User Avatar' />
					<AvatarFallback className='text-4xl'>{userInitial}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='text-xl font-semibold'>{fullName}</h2>
					<p className='text-muted-foreground text-sm'>{profile?.role || 'Роль'}</p>
					<p className='text-muted-foreground text-sm'>{profile?.email || 'Email'}</p>
				</div>
			</div>
			<Button variant='outline' className='mt-4'>
				<Pencil className='mr-2 h-4 w-4' />
				Редактировать профиль
			</Button>
		</div>
	)
}
