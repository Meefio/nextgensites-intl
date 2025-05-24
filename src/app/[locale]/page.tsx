import { Hero } from '@/app/components/hero'
import { Header } from '@/app/components/header'
import { SocialProof } from '@/app/components/SocialProof'
import { About } from '@/app/components/about-section'
import { TimelineSection } from '@/app/components/TimelineSection'
import { CtaSection } from '@/app/components/cta'
import { Footer } from '@/app/components/footer'
import { Pricing } from '@/app/components/pricing'
import { Faq } from '@/app/components/faq'
import { ContactForm } from '@/app/components/contact-form'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'
import { getAllPosts } from '@/utils/mdx'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamically import non-critical components with optimized loading
const WhyNotWordPressSection = dynamic(() => import('@/app/components/WhyNotWordPress-section'), {
	ssr: true,
	loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
})

const PortfolioSection = dynamic(() => import('@/app/components/portfolio-section'), {
	ssr: true,
	loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
})

const FeaturesSection = dynamic(() => import('@/app/components/features-section'), {
	ssr: true,
	loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
})

const LatestBlogPosts = dynamic(() => import('@/app/components/latest-blog-posts'), {
	ssr: true,
	loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg" />
})

// Static generation with 1-hour revalidation
export const revalidate = 3600 // 1 hour
export const dynamicParams = false // Generate only static params defined in generateStaticParams

// Generate static paths for all supported locales
export async function generateStaticParams() {
	return [
		{ locale: 'pl' },
		{ locale: 'en' }
	]
}

// Improved metadata generation with better caching
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const canonicalUrl = createCanonicalUrl('/', locale);
	const languages = createLanguageAlternates('/', '/', 'pl');

	const title = locale === 'pl'
		? 'Nowoczesne strony internetowe w Next.js | NextGen Sites'
		: 'Modern websites in Next.js | NextGen Sites';

	const description = locale === 'pl'
		? 'Tworzenie nowoczesnych stron internetowych w Next.js. Szybkie, zoptymalizowane pod SEO i responsywne strony internetowe dla firm.'
		: 'Creating modern websites in Next.js. Fast, SEO-optimized and responsive websites for businesses.';

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages,
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: 'NextGen Sites',
			locale: locale,
			type: 'website',
			images: [{
				url: '/images/og-image.png',
				width: 1200,
				height: 630,
				alt: title,
			}],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['/images/og-image.png'],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}
}

// Improved interface with proper types
interface GenerateMetadataProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function HomePage({ params }: GenerateMetadataProps) {
	const { locale } = await params;

	// Fetch blog posts for LatestBlogPosts component
	const latestPosts = getAllPosts(locale);

	// Optimized JSON-LD schemas
	const localBusinessSchema = {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"name": "NextGen Sites",
		"image": "https://nextgensites.pl/images/og-image.png",
		"@id": "https://nextgensites.pl",
		"url": "https://nextgensites.pl",
		"telephone": "+48-694-671-786",
		"priceRange": locale === 'pl' ? "PLN" : "USD",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Warszawa",
			"addressRegion": "mazowieckie",
			"addressCountry": "PL"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": 52.2297,
			"longitude": 21.0122
		},
		"openingHoursSpecification": {
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			"opens": "09:00",
			"closes": "19:00"
		},
		"areaServed": ["Warszawa", "Polska"],
		"serviceType": ["Tworzenie stron internetowych", "Next.js", "SEO"]
	};

	// FAQ Schema optimized for current locale
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Dlaczego korzystamy z Next.js?" : "Why do we use Next.js?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Next.js to nowoczesna technologia, która zapewnia doskonałą optymalizację SEO oraz wysoką wydajność. Strony stworzone w Next.js ładują się błyskawicznie i są lepiej indeksowane przez Google."
						: "Next.js is a modern technology that ensures excellent SEO optimization and high performance. Websites built with Next.js load instantly and are better indexed by Google."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Jakie mogą wystąpić koszty dodatkowe?" : "What additional costs may occur?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Domena (nazwa strony): ok. 16,99 zł/rok. Hosting jest dostępny na platformie Vercel za darmo. Firmowa poczta e-mail (opcjonalnie): ok. 23,88 zł/rok."
						: "Domain (website name): approx. $4.99/year. Hosting is available on Vercel for free. Business email (optional): approx. $5.99/year."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Czy strona będzie dobrze widoczna w Google?" : "Will my website be visible in Google?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Tak, wszystkie nasze strony są optymalizowane pod SEO, co zwiększa ich widoczność w wyszukiwarkach i poprawia pozycjonowanie."
						: "Yes, all our websites are SEO optimized, which increases their visibility in search engines and improves rankings."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Czy mogę dodać dodatkowe funkcje do strony?" : "Can I add additional features to the website?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Tak, możesz zamówić dodatkowe funkcje, takie jak wielojęzyczność, konfiguracja firmowego adresu e-mail, dark/light mode, blog, moduł opinii, newsletter, chatbot AI czy sklep internetowy."
						: "Yes, you can order additional features such as multilingual support, business email configuration, dark/light mode, blog, testimonials module, newsletter, AI chatbot, or e-commerce functionality."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Jakie prawa do strony będę miał po zakończeniu projektu?" : "What rights will I have to the website after project completion?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Po zakończeniu projektu otrzymujesz pełne prawa do strony i kodu, a także wszystkie niezbędne dostępy."
						: "After project completion, you receive full rights to the website and code, as well as all necessary access credentials."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Dlaczego nie WordPress?" : "Why not WordPress?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "WordPress wymaga częstych aktualizacji i konserwacji, jest podatny na problemy z bezpieczeństwem, często wolno się ładuje, co negatywnie wpływa na SEO i generuje regularne koszty utrzymania oraz hostingu."
						: "WordPress requires frequent updates and maintenance, is vulnerable to security issues, often loads slowly affecting SEO negatively, and generates regular maintenance and hosting costs."
				}
			}
		]
	};

	// Service/Offer catalog schema for homepage
	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		"name": locale === 'pl' ? "Tworzenie stron internetowych w Next.js" : "Next.js Website Development",
		"description": locale === 'pl'
			? "Profesjonalne tworzenie nowoczesnych stron internetowych w technologii Next.js z najwyższą jakością i doskonałą optymalizacją SEO."
			: "Professional development of modern websites using Next.js technology with highest quality and excellent SEO optimization.",
		"provider": {
			"@type": "Organization",
			"name": "NextGen Sites"
		},
		"areaServed": {
			"@type": "Country",
			"name": locale === 'pl' ? "Polska" : "Poland"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": locale === 'pl' ? "Pakiety stron internetowych" : "Website Packages",
			"itemListElement": [
				{
					"@type": "Offer",
					"name": locale === 'pl' ? "Pakiet Podstawowy" : "Basic Package",
					"description": locale === 'pl' ? "Strona typu landing page z responsywnym designem i optymalizacją SEO" : "Landing page with responsive design and SEO optimization",
					"price": locale === 'pl' ? "5499" : "1499",
					"priceCurrency": locale === 'pl' ? "PLN" : "USD",
					"priceValidUntil": "2025-12-31",
					"availability": "https://schema.org/InStock",
					"deliveryLeadTime": {
						"@type": "QuantitativeValue",
						"value": 7,
						"unitCode": "DAY"
					}
				},
				{
					"@type": "Offer",
					"name": locale === 'pl' ? "Pakiet Profesjonalny" : "Professional Package",
					"description": locale === 'pl' ? "Rozbudowana strona firmowa z wieloma podstronami i systemem CMS" : "Comprehensive business website with multiple pages and CMS",
					"price": locale === 'pl' ? "7999" : "2149",
					"priceCurrency": locale === 'pl' ? "PLN" : "USD",
					"priceValidUntil": "2025-12-31",
					"availability": "https://schema.org/InStock",
					"deliveryLeadTime": {
						"@type": "QuantitativeValue",
						"value": 21,
						"unitCode": "DAY"
					}
				},
				{
					"@type": "Offer",
					"name": locale === 'pl' ? "Rozwiązanie Premium" : "Premium Solution",
					"description": locale === 'pl' ? "Kompleksowy projekt z zaawansowanymi funkcjami i integracjami" : "Comprehensive project with advanced features and integrations",
					"price": locale === 'pl' ? "25000" : "6000",
					"priceCurrency": locale === 'pl' ? "PLN" : "USD",
					"priceValidUntil": "2025-12-31",
					"availability": "https://schema.org/InStock",
					"deliveryLeadTime": {
						"@type": "QuantitativeValue",
						"value": 30,
						"unitCode": "DAY"
					}
				}
			]
		}
	};

	// BreadcrumbList schema for homepage
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": locale === 'pl' ? "Strona główna" : "Home",
				"item": locale === 'pl' ? "https://nextgensites.pl/" : "https://nextgensites.pl/en/"
			}
		]
	};

	// HowTo schema for website creation process
	const howToSchema = {
		"@context": "https://schema.org",
		"@type": "HowTo",
		"name": locale === 'pl' ? "Jak stworzyć nowoczesną stronę internetową dla firmy" : "How to Create a Modern Website for Your Business",
		"description": locale === 'pl'
			? "Kompleksowy przewodnik krok po kroku dotyczący procesu tworzenia profesjonalnej strony internetowej w technologii Next.js"
			: "A comprehensive step-by-step guide to creating a professional website using Next.js technology",
		"image": "https://nextgensites.pl/images/og-image.png",
		"totalTime": "P30D",
		"estimatedCost": {
			"@type": "MonetaryAmount",
			"currency": locale === 'pl' ? "PLN" : "USD",
			"value": locale === 'pl' ? "7999" : "2149"
		},
		"tool": [
			{
				"@type": "HowToTool",
				"name": "Next.js 15"
			},
			{
				"@type": "HowToTool",
				"name": "Sanity CMS"
			},
			{
				"@type": "HowToTool",
				"name": "Radix UI"
			},
			{
				"@type": "HowToTool",
				"name": "Tailwind CSS"
			},
			{
				"@type": "HowToTool",
				"name": "TypeScript"
			}
		],
		"supply": [
			{
				"@type": "HowToSupply",
				"name": locale === 'pl' ? "Materiały firmowe" : "Company materials"
			},
			{
				"@type": "HowToSupply",
				"name": locale === 'pl' ? "Logo i zdjęcia" : "Logo and photos"
			},
			{
				"@type": "HowToSupply",
				"name": locale === 'pl' ? "Treści do strony" : "Website content"
			}
		],
		"step": [
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Rozmowa i analiza potrzeb" : "Intro Call & Needs Analysis",
				"text": locale === 'pl'
					? "Kontaktujesz się z nami – my poznajemy Twoje potrzeby i cele. Przekazujesz materiały, a my doradzamy najlepsze rozwiązania."
					: "Reach out via form, phone, or email. We'll discuss your goals, collect materials, and suggest the best solutions.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step1.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Analiza biznesu i określenie celów strony." : "Business analysis and website goal definition."
				}
			},
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Wycena i planowanie" : "Quote & Planning",
				"text": locale === 'pl'
					? "Tworzymy ofertę, harmonogram i strukturę strony dopasowaną do Twojego biznesu."
					: "Based on your input, we prepare a quote, timeline, and site structure tailored to your business.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step2.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Przygotowanie szczegółowej oferty i harmonogramu." : "Preparing detailed quote and timeline."
				}
			},
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Treści i układ strony" : "Content & Layout",
				"text": locale === 'pl'
					? "Proponujemy teksty i wygląd strony. Wprowadzamy Twoje sugestie i dopracowujemy szczegóły."
					: "We propose content and layout aligned with your brand. Your feedback helps refine the final version.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step3.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Projektowanie UX/UI i przygotowanie treści." : "UX/UI design and content preparation."
				}
			},
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Tworzenie i SEO" : "Development & SEO",
				"text": locale === 'pl'
					? "Budujemy szybką, responsywną i zoptymalizowaną stronę zgodną z najlepszymi praktykami SEO."
					: "We build a fast, responsive website optimized for performance, SEO, and mobile devices.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step4.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Programujemy stronę w najnowszych technologiach." : "Programming the website using the latest technologies."
				}
			},
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Testy i publikacja" : "Testing & Launch",
				"text": locale === 'pl'
					? "Sprawdzamy wszystko, a po Twojej akceptacji uruchamiamy stronę i konfigurujemy niezbędne narzędzia."
					: "We test every feature thoroughly. After your approval, we launch the site and set up email and analytics tools.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step5.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Zatwierdzasz gotową stronę przed publikacją." : "You approve the finished website before publication."
				}
			},
			{
				"@type": "HowToStep",
				"name": locale === 'pl' ? "Stałe wsparcie" : "Ongoing Support",
				"text": locale === 'pl'
					? "Po wdrożeniu jesteśmy do dyspozycji – zapewniamy pomoc i rozwój strony w miarę potrzeb."
					: "After launch, we offer technical support and help grow your site as your business evolves.",
				"url": "https://nextgensites.pl/#proces",
				"image": "https://nextgensites.pl/images/step6.jpg",
				"itemListElement": {
					"@type": "HowToDirection",
					"text": locale === 'pl' ? "Zapewniamy długoterminowe wsparcie techniczne." : "We provide long-term technical support."
				}
			}
		]
	};

	return (
		<>
			<Header />
			<main>
				{/* Optimized Schema.org JSON-LD with conditional rendering */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(localBusinessSchema)
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqSchema)
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(serviceSchema)
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(breadcrumbSchema)
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(howToSchema)
					}}
				/>

				{/* Critical content loaded immediately */}
				<Hero locale={locale} priorityImage={true} />
				<SocialProof />

				{/* Non-critical content loaded dynamically */}
				<FeaturesSection />
				<About />
				<PortfolioSection />
				<WhyNotWordPressSection />
				<TimelineSection />
				<Pricing />
				<LatestBlogPosts locale={locale} posts={latestPosts} />
				<Faq />
				<CtaSection />
				<ContactForm />
			</main>
			<Footer />
		</>
	)
}
