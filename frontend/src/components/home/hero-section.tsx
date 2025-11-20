import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
	return (
		<section className="px-6 py-16 text-center bg-gradient-to-b from-white to-blue-50">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8 flex items-center justify-center">
					<div className="flex items-center space-x-2 rounded-full border px-4 py-1 text-sm text-gray-600">
						<div className="size-2 rounded-full bg-blue-500" />
						<span>Образование</span>
					</div>
				</div>

				<h1 className="mb-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
					Добро пожаловать на
					<br />
					<span className="text-blue-600">Образовательную платформу</span>
				</h1>

				<p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
					Раскройте свой потенциал с нашими интерактивными курсами, созданными для 
					эффективного обучения и развития навыков.
				</p>

				<div className="flex justify-center gap-4">
					<Button asChild size="lg">
						<Link href="/auth/register">Начать обучение</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/subjects">Просмотреть курсы</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}