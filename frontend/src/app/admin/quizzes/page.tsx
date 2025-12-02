'use client'

import dynamic from 'next/dynamic'

const LazyQuizzesTable = dynamic(
	() =>
		import('@/src/components/admin/quizzes-table').then(mod => ({
			default: mod.QuizzesTable,
		})),
	{ ssr: false }
)

export default function AdminQuizzesPage() {
	return (
		<div className='space-y-6 p-6'>
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>Тесты</h1>
				<p className='text-gray-600'>Управление тестами для уроков</p>
			</div>

			<LazyQuizzesTable />
		</div>
	)
}
