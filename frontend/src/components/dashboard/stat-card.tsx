import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'

interface StatCardProps {
	title: string
	value: string | number
	change?: string
	changeType?: 'increase' | 'decrease' | 'neutral'
	icon?: ReactNode
	iconBgClass?: string
}

export function StatCard({
	title,
	value,
	change,
	changeType = 'neutral',
	icon,
	iconBgClass,
}: StatCardProps) {
	const changeClass =
		changeType === 'increase'
			? 'text-green-500'
			: changeType === 'decrease'
				? 'text-red-500'
				: 'text-gray-500'
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				{icon && (
					<div
						className={cn(
							'flex h-8 w-8 items-center justify-center rounded-full',
							iconBgClass
						)}
					>
						{icon}
					</div>
				)}
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				{change && (
					<p className={cn('text-xs', changeClass)}>{change}</p>
				)}
			</CardContent>
		</Card>
	)
}
