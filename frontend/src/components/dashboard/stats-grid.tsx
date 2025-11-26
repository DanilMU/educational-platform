'use client'

import { StatCard } from './stat-card'
import { BookOpen, TrendingUp, Gem, Clock } from 'lucide-react'

export function StatsGrid() {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			<StatCard
				title='Курсов пройдено'
				value='12'
				change='+2 в этом месяце'
				changeType='increase'
				icon={<BookOpen className='h-4 w-4 text-blue-800' />}
				iconBgClass='bg-blue-800/20'
			/>
			<StatCard
				title='Текущий прогресс'
				value='68%'
				change='+15% за неделю'
				changeType='increase'
				icon={<TrendingUp className='h-4 w-4 text-green-600' />}
				iconBgClass='bg-green-100'
			/>
			<StatCard
				title='Очки опыта'
				value='2,450'
				change='+320 сегодня'
				changeType='increase'
				icon={<Gem className='h-4 w-4 text-yellow-600' />}
				iconBgClass='bg-yellow-100'
			/>
			<StatCard
				title='Часов обучения'
				value='127'
				change='8 часов на этой неделе'
				changeType='neutral'
				icon={<Clock className='h-4 w-4 text-purple-600' />}
				iconBgClass='bg-purple-100'
			/>
		</div>
	)
}
