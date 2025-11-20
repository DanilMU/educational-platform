import { SiteHeader } from '@/src/components/layout/site-header'
import { HeroSection } from '@/src/components/home/hero-section'
import { FeaturedCourses } from '@/src/components/home/featured-courses'
import { FeaturesSection } from '@/src/components/home/features-section'
import { FAQSection } from '@/src/components/home/faq-section'
import { SiteFooter } from '../components/layout/site-footer'

export default function HomePage() {
	return (
	<div className="min-h-screen flex flex-col">
			<SiteHeader />
			<main className="flex-grow">
				<HeroSection />
				<FeaturedCourses />
				<FeaturesSection />
				<FAQSection />
			</main>
			<SiteFooter />
		</div>
	)
}
