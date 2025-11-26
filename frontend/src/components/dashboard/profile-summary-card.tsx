'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import { Pencil } from 'lucide-react'
import { useGetProfileQuery } from '@/src/api/hooks'

import { User } from '@/src/api/types/user';

export function ProfileSummaryCard() {
	const { data: profile, isLoading, error } = useGetProfileQuery();

	if (isLoading) {
		return (
			<div className='rounded-lg bg-white p-6 shadow-sm'>
				<div className='flex items-center space-x-4'>
					<div className='h-24 w-24 rounded-full bg-gray-200 animate-pulse' />
					<div className='space-y-2'>
						<div className='h-6 bg-gray-200 rounded w-48 animate-pulse' />
						<div className='h-4 bg-gray-200 rounded w-32 animate-pulse' />
						<div className='h-4 bg-gray-200 rounded w-40 animate-pulse' />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='rounded-lg bg-white p-6 shadow-sm'>
				<div className='text-red-500'>Ошибка загрузки профиля: {(error as Error).message}</div>
			</div>
		);
	}

	const fullName = profile?.firstName ? `${profile.firstName} ${profile.lastName}`.trim() : 'Пользователь';
	const userInitial = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : '?';

	return (
		<div className='rounded-lg bg-white p-6 shadow-sm'>
			<div className='flex items-center space-x-4'>
				<Avatar className='h-24 w-24'>
					<AvatarImage src={profile?.avatarUrl} alt='User Avatar' />
					<AvatarFallback className='text-4xl'>{userInitial}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='text-xl font-semibold'>{fullName}</h2>
					<p className='text-muted-foreground text-sm'>{profile?.role || 'Роль'}</p>
					<p className='text-muted-foreground text-sm'>{profile?.email || 'Email'}</p>
					{profile?.phone && (
						<p className='text-muted-foreground text-sm'>{profile.phone}</p>
					)}
					{profile?.city && (
						<p className='text-muted-foreground text-sm'>{profile.city}</p>
					)}
				</div>
			</div>
			<Button variant='outline' className='mt-4'>
				<Pencil className='mr-2 h-4 w-4' />
				Редактировать профиль
			</Button>
		</div>
	)
}
