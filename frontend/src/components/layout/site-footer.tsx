export function SiteFooter() {
	return (
		<footer className="bg-card text-foreground py-12">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">Образовательная Платформа</h3>
						<p className="text-muted-foreground">
							Создаем возможности для обучения и развития профессиональных навыков.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Курсы</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li><a href="#" className="hover:text-foreground">Все курсы</a></li>
							<li><a href="#" className="hover:text-foreground">Популярные</a></li>
							<li><a href="#" className="hover:text-foreground">Новые</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Поддержка</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li><a href="#" className="hover:text-foreground">Помощь</a></li>
							<li><a href="#" className="hover:text-foreground">Контакты</a></li>
							<li><a href="#" className="hover:text-foreground">FAQ</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">О нас</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li><a href="#" className="hover:text-foreground">О платформе</a></li>
							<li><a href="#" className="hover:text-foreground">Команда</a></li>
							<li><a href="#" className="hover:text-foreground">Карьера</a></li>
						</ul>
					</div>
				</div>
				<div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} Образовательная Платформа. Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}