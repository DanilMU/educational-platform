export function SiteFooter() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">Образовательная Платформа</h3>
						<p className="text-gray-400">
							Создаем возможности для обучения и развития профессиональных навыков.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Курсы</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">Все курсы</a></li>
							<li><a href="#" className="hover:text-white">Популярные</a></li>
							<li><a href="#" className="hover:text-white">Новые</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Поддержка</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">Помощь</a></li>
							<li><a href="#" className="hover:text-white">Контакты</a></li>
							<li><a href="#" className="hover:text-white">FAQ</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">О нас</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">О платформе</a></li>
							<li><a href="#" className="hover:text-white">Команда</a></li>
							<li><a href="#" className="hover:text-white">Карьера</a></li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
					<p>&copy; {new Date().getFullYear()} Образовательная Платформа. Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}