'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import { Pencil } from 'lucide-react'
import { useGetProfileQuery } from '@/src/api/hooks'

import { User } from '@/src/api/types/user';

// Вспомогательная функция для извлечения строкового значения из объекта или строки
function extractStringValue(value: string | { [key: string]: unknown } | undefined): string {
	if (typeof value === 'string') {
		return value;
	}
	if (value && typeof value === 'object') {
		return Object.values(value)[0] as string || '';
	}
	return '';
}

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

	const firstName = extractStringValue(profile?.firstName);
	const lastName = extractStringValue(profile?.lastName);
	const fullName = firstName ? `${firstName} ${lastName}`.trim() : 'Пользователь';
	const userInitial = firstName ? firstName.charAt(0).toUpperCase() : '?';

	// Обработка значений с учетом их возможной структуры объекта
	const avatarUrl = extractStringValue(profile?.avatarUrl);
	const phone = extractStringValue(profile?.phone);
	const city = extractStringValue(profile?.city);

	return (
		<div className='rounded-lg bg-white p-6 shadow-sm'>
			<div className='flex items-center space-x-4'>
				<Avatar className='h-24 w-24'>
					<AvatarImage src={avatarUrl} alt='User Avatar' />
					<AvatarFallback className='text-4xl'>{userInitial}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='text-xl font-semibold'>{fullName}</h2>
					<p className='text-muted-foreground text-sm'>{profile?.role || 'Роль'}</p>
					<p className='text-muted-foreground text-sm'>{profile?.email || 'Email'}</p>
					{phone && (
						<p className='text-muted-foreground text-sm'>{phone}</p>
					)}
					{city && (
						<p className='text-muted-foreground text-sm'>{city}</p>
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
