'use client'

import { UserIcon } from 'lucide-react'


import { useGetProfileQuery } from '@/src/api/hooks'
import { Skeleton } from '../ui/skeleton'

export function DashboardHeader() {
	const { data: user, isLoading } = useGetProfileQuery()

	return (
		<header className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>
					Личный кабинет
				</h1>
				<p className='mt-1 text-gray-600'>
					Добро пожаловать, {isLoading ? '...' : user?.name}! Здесь вы
					можете отслеживать свой прогресс.
				</p>
			</div>

			<div className='flex w-full items-center justify-end gap-3 sm:w-auto'>
				<div className='flex size-10 items-center justify-center rounded-full bg-orange-500'>
					<UserIcon className='size-5 text-white' />
				</div>

				<div className='text-right sm:text-left'>
					{isLoading ? (
						<div className='space-y-1'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-3 w-32' />
						</div>
					) : (
						<>
							<p className='font-medium text-gray-900'>
								{user?.name}
							</p>
							<p className='text-sm text-gray-600'>
								{user?.email}
							</p>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
