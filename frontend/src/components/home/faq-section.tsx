import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion'

export function FAQSection() {
	const faqs = [
	{ question: "Как начать обучение?", answer: "Зарегистрируйтесь на платформе и выберите интересующий вас курс." },
		{ question: "Есть ли бесплатные курсы?", answer: "Да, у нас есть бесплатные курсы для ознакомления с платформой." },
		{ question: "Получу ли я сертификат?", answer: "По окончании курса вы получаете сертификат об образовании." },
		{ question: "Могу ли я учиться в своем темпе?", answer: "Да, вы можете проходить курсы в удобное для вас время." }
	]

	return (
		<section className="py-16 px-6 bg-white">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
					<p className="text-gray-600">
						Ответы на популярные вопросы о нашей платформе
					</p>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem value={`item-${index}`} key={index}>
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}