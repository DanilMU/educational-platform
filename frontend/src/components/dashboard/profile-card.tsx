'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/src/components/ui/button'
import { Pencil, MapPin, Mail, Phone, Calendar } from 'lucide-react'
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

export function ProfileCard() {
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
				<div className='mt-6 grid grid-cols-2 gap-4'>
					<div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
					<div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
					<div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
					<div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
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
	const phone = profile?.phone || '';
	const city = profile?.city || '';
	const dob = profile?.dob || '';

	// Проверяем роль пользователя
	const isStudent = profile?.role === 'STUDENT';

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
				</div>
			</div>
			
			<div className='mt-6 grid grid-cols-2 gap-4'>
				{phone && (
					<div className='flex items-center'>
						<Phone className='mr-2 h-4 w-4 text-muted-foreground' />
						<span>{phone}</span>
					</div>
				)}
				{city && (
					<div className='flex items-center'>
						<MapPin className='mr-2 h-4 w-4 text-muted-foreground' />
						<span>{city}</span>
					</div>
				)}
				{dob && (
					<div className='flex items-center'>
						<Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
						<span>{dob}</span>
					</div>
				)}
			</div>
			
			<Button variant='outline' className='mt-6'>
				<Pencil className='mr-2 h-4 w-4' />
				Редактировать профиль
			</Button>
			
			{/* Панель администратора не отображается для STUDENT пользователя */}
			{!isStudent && (
				<div className='mt-6 pt-6 border-t border-gray-200'>
					<h3 className='font-medium mb-2'>Административные функции</h3>
					<div className='flex space-x-2'>
						<Button variant='outline' size='sm'>Управление пользователями</Button>
						<Button variant='outline' size='sm'>Настройки системы</Button>
					</div>
				</div>
			)}
		</div>
	)
}