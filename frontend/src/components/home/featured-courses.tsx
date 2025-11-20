import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export function FeaturedCourses() {
	return (
		<section className="py-16 px-6 bg-white">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Популярные курсы</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Выберите из широкого ассортимента курсов, разработанных экспертами в своей области
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[
						{ title: "Безопасность труда", description: "Изучите основы охраны труда и промышленной безопасности" },
						{ title: "Программирование", description: "Современные языки программирования и фреймворки" },
						{ title: "Менеджмент", description: "Развивайте навыки управления проектами и командами" }
					].map((course, index) => (
						<div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
							<h3 className="text-xl font-semibold mb-2">{course.title}</h3>
							<p className="text-gray-600 mb-4">{course.description}</p>
							<Button variant="outline" className="w-full">Начать курс</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}