import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Instrument_Sans, Lily_Script_One } from "next/font/google";
import '../globals.css'
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/components/theme-provider"
import { Toaster } from "@/app/components/ui/toaster";
import { CookieBanner } from "@/app/components/cookie-banner";
import { GoogleAnalytics } from "@/app/components/analytics/google-analytics";
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { metadata as baseMetadata } from './metadata';

interface GenerateMetadataProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Metadata' });

	const baseMetadataWithLocale = baseMetadata(locale);

	const alternateLanguages = {
		languages: {
			'pl': locale === 'pl' ? 'https://nextgensites.pl' : 'https://nextgensites.pl',
			'en': locale === 'en' ? 'https://nextgensites.pl/en' : 'https://nextgensites.pl/en'
		}
	};

	const metadata: Metadata = {
		title: {
			default: t('title.default'),
			template: t('title.template')
		},
		description: t('description'),
		applicationName: t('applicationName'),
		authors: [{ name: t('authors.name'), url: t('authors.url') }],
		generator: t('generator'),
		keywords: t('keywords').split(',').map(k => k.trim()),
		creator: t('creator'),
		publisher: t('publisher'),
		openGraph: {
			...baseMetadataWithLocale.openGraph,
			siteName: t('openGraph.siteName'),
			title: t('openGraph.title'),
			description: t('openGraph.description'),
			locale: locale,
			alternateLocale: locale === 'pl' ? ['en'] : ['pl'],
		},
		twitter: {
			...baseMetadataWithLocale.twitter,
		},
		alternates: alternateLanguages,
	};

	return {
		...baseMetadataWithLocale,
		...metadata
	} as Metadata;
}

const fontSans = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const fontHeading = Instrument_Sans({
	variable: "--font-heading",
	subsets: ["latin"],
});

const fontQuote = Lily_Script_One({
	variable: "--font-quote",
	weight: "400",
	subsets: ["latin"],
});

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const messages = await import(`@/../messages/${locale}.json`).then(module => module.default)

	// Pobierz zgodę na pliki cookie z cookies
	const cookieStore = await cookies();
	const cookieConsentStr = cookieStore.get("cookieConsent")?.value;
	const consent = cookieConsentStr
		? JSON.parse(cookieConsentStr)
		: { necessary: true, analytics: false, marketing: false };

	// Schema.org JSON-LD dla strony głównej
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "NextGen Sites",
		"url": locale === 'pl' ? "https://nextgensites.pl/" : `https://nextgensites.pl/${locale}/`,
		"inLanguage": locale === 'pl' ? "pl-PL" : "en-US",
		"potentialAction": {
			"@type": "SearchAction",
			"target": `https://nextgensites.pl/${locale === 'pl' ? '' : locale + '/'}search?q={search_term_string}`,
			"query-input": "required name=search_term_string"
		}
	};

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "NextGen Sites",
		"url": "https://nextgensites.pl",
		"logo": "https://nextgensites.pl/images/logo.png",
		"contactPoint": {
			"@type": "ContactPoint",
			"telephone": "+48-694-671-786",
			"contactType": "customer service",
			"email": "kontakt@nextgensites.pl"
		},
		"sameAs": [
			"https://www.facebook.com/nextgensites",
			"https://www.instagram.com/nextgensites/",
			"https://www.linkedin.com/company/nextgensites/"
		]
	};

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
				"price": locale === 'pl' ? "2999" : "799",
				"priceCurrency": locale === 'pl' ? "PLN" : "USD"
			},
			{
				"@type": "Offer",
				"name": locale === 'pl' ? "Rozwiązanie zaawansowane" : "Professional Solution",
				"description": locale === 'pl' ? "Strona wielopodstronowa z formularzem kontaktowym" : "Multi-page website with contact form",
				"price": locale === 'pl' ? "4999" : "1299",
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
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link
					rel="canonical"
					href={`https://nextgensites.pl${locale === 'pl' ? '' : `/${locale}`}`}
				/>
				<GoogleAnalytics
					measurementId="G-5YLJH8GHZ6"
					consent={consent}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(wpComparisonSchema) }}
				/>
			</head>
			<body suppressHydrationWarning
				className={cn(
					" font-sans antialiased scroll-smooth",
					"w-full",
					fontSans.variable,
					fontHeading.variable,
					fontQuote.variable
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider locale={locale} messages={messages}>


						{children}
						<Toaster />
						<CookieBanner />
					</NextIntlClientProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}
