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
import { Metadata } from 'next'
import Script from 'next/script'
import dynamic from 'next/dynamic'

// Dynamically import non-critical components
const WhyNotWordPressSection = dynamic(() => import('@/app/components/WhyNotWordPress-section').then(mod => mod.default), { ssr: true })
const PortfolioSection = dynamic(() => import('@/app/components/portfolio-section').then(mod => mod.default), { ssr: true })
const FeaturesSection = dynamic(() => import('@/app/components/features-section').then(mod => mod.default), { ssr: true })
const LatestBlogPosts = dynamic(() => import('@/app/components/latest-blog-posts').then(mod => mod.default), { ssr: true })

// Dodajemy ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Odświeżanie co godzinę

// Poprawiona definicja typów
interface GenerateMetadataProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const canonicalUrl = createCanonicalUrl('/', locale);

	// Tworzymy alternatywne URL-e dla każdego języka plus x-default
	const languages = createLanguageAlternates('/', '/', 'pl');

	return {
		alternates: {
			canonical: canonicalUrl,
			languages,
		},
	}
}

export default async function HomePage({ params }: GenerateMetadataProps) {
	const { locale } = await params;

	// FAQ Schema.org JSON-LD
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
						? "Next.js to nowoczesna technologia, która zapewnia doskonałą optymalizację SEO oraz wysoką wydajność. Strony stworzone w Next.js ładują się błyskawicznie i są lepiej indeksowane przez Google. Dodatkowo, koszty utrzymania są minimalne, ponieważ strony mogą działać na darmowym hostingu Vercel – platformie stworzonej przez twórców Next.js."
						: "Next.js is a modern technology that ensures excellent SEO optimization and high performance. Websites built with Next.js load instantly and are better indexed by Google. Additionally, maintenance costs are minimal because sites can run on free Vercel hosting – a platform created by Next.js developers."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Jakie mogą wystąpić koszty dodatkowe?" : "What additional costs may occur?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Domena (nazwa strony): ok. 16,99 zł/rok. Hosting jest dostępny na platformie Vercel za darmo. Firmowa poczta e-mail (opcjonalnie): ok. 23,88 zł/rok w rekomendowanym przez nas Hostingerze."
						: "Domain (website name): approx. $4.99/year. Hosting is available on Vercel for free. Business email (optional): approx. $5.99/year with our recommended provider Hostinger."
				}
			},
			{
				"@type": "Question",
				"name": locale === 'pl' ? "Czy mogę samodzielnie edytować treści na stronie?" : "Can I edit the website content myself?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": locale === 'pl'
						? "Oczywiście! Należy jednak pamiętać, aby zgłosić taką potrzebę na etapie wyceny projektu. System zarządzania treścią (CMS) jest dostępny w pakiecie \"Rozwiązanie premium\" i pozwala na łatwą edycję tekstów, zdjęć oraz innych elementów strony bez znajomości programowania."
						: "Absolutely! However, remember to request this feature during the project estimation phase. The Content Management System (CMS) is available in the \"Premium Solution\" package and allows for easy editing of texts, images, and other website elements without any programming knowledge."
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

	// Service Schema.org JSON-LD
	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		"serviceType": "Website Development",
		"provider": {
			"@type": "Organization",
			"name": "NextGen Sites",
			"url": "https://nextgensites.pl"
		},
		"offers": [
			{
				"@type": "Offer",
				"name": locale === 'pl' ? "Rozwiązanie podstawowe" : "Basic Solution",
				"description": locale === 'pl' ? "Strona typu Single Page (bez podstron)" : "Single Page Website (no subpages)",
				"price": locale === 'pl' ? "5499" : "1499",
				"priceCurrency": locale === 'pl' ? "PLN" : "USD"
			},
			{
				"@type": "Offer",
				"name": locale === 'pl' ? "Rozwiązanie zaawansowane" : "Professional Solution",
				"description": locale === 'pl' ? "Strona wielopodstronowa z formularzem kontaktowym" : "Multi-page website with contact form",
				"price": locale === 'pl' ? "7999" : "2149",
				"priceCurrency": locale === 'pl' ? "PLN" : "USD"
			},
			{
				"@type": "Offer",
				"name": locale === 'pl' ? "Rozwiązanie premium" : "Premium Solution",
				"description": locale === 'pl' ? "Strona z CMS i wielojęzycznością" : "Website with CMS and multilingual support",
				"price": locale === 'pl' ? "Wycena indywidualna" : "Custom quote",
				"priceCurrency": locale === 'pl' ? "PLN" : "USD"
			}
		]
	};

	// WordPress Comparison JSON-LD
	const wpComparisonSchema = {
		"@context": "https://schema.org",
		"@type": "ComparisonTable",
		"about": {
			"@type": "Thing",
			"name": "Next.js vs WordPress"
		},
		"subjectOf": {
			"@type": "WebPage",
			"url": locale === 'pl' ? "https://nextgensites.pl/#why-not-wordpress" : `https://nextgensites.pl/${locale}/#why-not-wordpress`
		},
		"comparisonItems": [
			{
				"@type": "ComparisonItem",
				"name": locale === 'pl' ? "Aktualizacje i konserwacja" : "Updates and maintenance",
				"description": locale === 'pl'
					? "WordPress wymaga regularnych aktualizacji i konserwacji, podczas gdy strony Next.js są prawie bezobsługowe."
					: "WordPress requires regular updates and maintenance, while Next.js sites are almost maintenance-free."
			},
			{
				"@type": "ComparisonItem",
				"name": locale === 'pl' ? "Czas ładowania" : "Loading time",
				"description": locale === 'pl'
					? "Strony WordPress często ładują się wolno, co negatywnie wpływa na doświadczenie użytkownika i SEO, podczas gdy Next.js zapewnia błyskawiczne ładowanie strony."
					: "WordPress sites often load slowly, negatively affecting user experience and SEO, while Next.js provides lightning-fast page loading."
			},
			{
				"@type": "ComparisonItem",
				"name": locale === 'pl' ? "Wydajność" : "Performance",
				"description": locale === 'pl'
					? "WordPress jest często nieefektywny, podczas gdy Next.js oferuje doskonałą wydajność dzięki renderowaniu po stronie serwera i optymalizacji."
					: "WordPress is often inefficient, while Next.js offers excellent performance through server-side rendering and optimization."
			},
			{
				"@type": "ComparisonItem",
				"name": locale === 'pl' ? "Bezpieczeństwo" : "Security",
				"description": locale === 'pl'
					? "WordPress jest podatny na liczne zagrożenia bezpieczeństwa, podczas gdy Next.js zapewnia znacznie lepszą ochronę."
					: "WordPress is vulnerable to numerous security threats, while Next.js provides much better protection."
			},
			{
				"@type": "ComparisonItem",
				"name": locale === 'pl' ? "Koszty" : "Costs",
				"description": locale === 'pl'
					? "WordPress generuje regularne koszty utrzymania i hostingu, podczas gdy Next.js może być hostowany za darmo na Vercel."
					: "WordPress generates regular maintenance and hosting costs, while Next.js can be hosted for free on Vercel."
			}
		]
	};

	return (
		<>
			{/* Google Tag Manager script with worker strategy for better performance */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-5YLJH8GHZ6"
				strategy="worker"
			/>

			<Header />
			<main>
				{/* Schema.org LocalBusiness - poprawa widoczności w wyszukiwaniach lokalnych */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "ProfessionalService",
							"name": "NextGen Sites",
							"image": "https://nextgensites.pl/images/og-image.png",
							"@id": "https://nextgensites.pl",
							"url": "https://nextgensites.pl",
							"telephone": "+48-694-671-786",
							"priceRange": "PLN",
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
							// "sameAs": [
							// 	"https://www.facebook.com/nextgensites",
							// 	"https://www.instagram.com/nextgensites/",
							// 	"https://www.linkedin.com/company/nextgensites/"
							// ],
							"areaServed": ["Warszawa", "Polska"],
							"serviceType": ["Tworzenie stron internetowych", "Next.js", "SEO"]
						})
					}}
				/>

				{/* Schema.org FAQ - pytania i odpowiedzi */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqSchema)
					}}
				/>

				{/* Service Schema - oferta usług */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(serviceSchema)
					}}
				/>

				{/* WordPress Comparison Schema - porównanie Next.js i WordPress */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(wpComparisonSchema)
					}}
				/>

				{/* Schema.org HowTo dla etapów tworzenia strony */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "HowTo",
							"name": "Jak tworzymy nowoczesne strony internetowe",
							"description": "Proces tworzenia nowoczesnej strony internetowej w Next.js od pierwszego kontaktu po gotową stronę",
							"totalTime": "P30D",
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
									"name": "Shadcn"
								}
							],
							"step": [
								{
									"@type": "HowToStep",
									"name": "Rozmowa i analiza",
									"text": "Kontaktujesz się z nami – my poznajemy Twoje potrzeby i cele. Przekazujesz materiały, a my doradzamy najlepsze rozwiązania.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step1.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Skontaktuj się z nami przez formularz lub telefon."
									}
								},
								{
									"@type": "HowToStep",
									"name": "Wycena i plan",
									"text": "Tworzymy ofertę, harmonogram i strukturę strony dopasowaną do Twojego biznesu.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step2.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Otrzymasz szczegółową wycenę i plan projektu."
									}
								},
								{
									"@type": "HowToStep",
									"name": "Treści i układ",
									"text": "Proponujemy teksty i wygląd strony. Wprowadzamy Twoje sugestie i dopracowujemy szczegóły.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step3.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Zatwierdzasz projekt graficzny i treści."
									}
								},
								{
									"@type": "HowToStep",
									"name": "Tworzenie i SEO",
									"text": "Budujemy szybką, responsywną i zoptymalizowaną stronę zgodną z najlepszymi praktykami SEO.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step4.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Programujemy stronę w najnowszych technologiach."
									}
								},
								{
									"@type": "HowToStep",
									"name": "Testy i publikacja",
									"text": "Sprawdzamy wszystko, a po Twojej akceptacji uruchamiamy stronę i konfigurujemy niezbędne narzędzia.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step5.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Zatwierdzasz gotową stronę przed publikacją."
									}
								},
								{
									"@type": "HowToStep",
									"name": "Stałe wsparcie",
									"text": "Po wdrożeniu jesteśmy do dyspozycji – zapewniamy pomoc i rozwój strony w miarę potrzeb.",
									"url": "https://nextgensites.pl/#proces",
									"image": "https://nextgensites.pl/images/step6.jpg",
									"itemListElement": {
										"@type": "HowToDirection",
										"text": "Kontaktuj się z nami w przypadku potrzeby zmian lub rozbudowy."
									}
								}
							]
						})
					}}
				/>

				<Hero locale={locale} priorityImage={true} />
				<SocialProof />
				<FeaturesSection />
				<About />
				<PortfolioSection />
				<WhyNotWordPressSection />
				<TimelineSection />
				<Pricing />
				<LatestBlogPosts locale={locale} />
				<Faq />
				<CtaSection />
				<ContactForm />
			</main>
			<Footer />
		</>
	)
}
