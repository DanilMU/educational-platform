export function FAQSection() {
	const faqs = [
	{ question: "Как начать обучение?", answer: "Зарегистрируйтесь на платформе и выберите интересующий вас курс." },
		{ question: "Есть ли бесплатные курсы?", answer: "Да, у нас есть бесплатные курсы для ознакомления с платформой." },
		{ question: "Получу ли я сертификат?", answer: "По окончании курса вы получаете сертификат об образовании." },
		{ question: "Могу ли я учиться в своем темпе?", answer: "Да, вы можете проходить курсы в удобное для вас время." }
	]

	return (
		<section className="py-16 px-6 bg-white">
			<div className="mx-auto max-w-4xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
					<p className="text-gray-600">
						Ответы на популярные вопросы о нашей платформе
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div key={index} className="border rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
							<p className="text-gray-600">{faq.answer}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}