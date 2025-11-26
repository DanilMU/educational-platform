export function FeaturesSection() {
	return (
		<section className="py-16 px-6 bg-gray-50">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Мы создаем условия для эффективного и увлекательного обучения
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{[
						{ title: "Интерактивные уроки", description: "Практические задания и тесты для закрепления материала" },
						{ title: "Персонализированное обучение", description: "Программы подстраиваются под ваш уровень и темп" },
						{ title: "Экспертные инструкторы", description: "Опытные преподаватели с реальным опытом" },
						{ title: "Гибкий график", description: "Учитесь в удобное для вас время" }
					].map((feature, index) => (
						<div key={index} className="text-center">
							<div className="bg-blue-800/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<div className="bg-blue-800 w-8 h-8 rounded-full"></div>
							</div>
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}