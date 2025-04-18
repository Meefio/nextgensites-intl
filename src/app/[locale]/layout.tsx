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
import { ScrollToTop } from '@/app/components/ScrollToTop';
import ClientDocumentTitleWrapper from '@/app/components/ClientDocumentTitleWrapper';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { metadata as baseMetadata } from './metadata';
import { createCanonicalUrl } from '@/app/utils/createCanonicalUrl';

// Poprawiona definicja typów parametrów
type Params = {
	locale: string;
}

export async function generateMetadata({
	params: paramsPromise
}: {
	params: Promise<Params> | Params
}): Promise<Metadata> {
	const params = await Promise.resolve(paramsPromise);
	const { locale } = params;
	const t = await getTranslations({ locale, namespace: 'Metadata' });

	const baseMetadataWithLocale = baseMetadata(locale);

	const alternateLanguages = {
		languages: {
			'pl': createCanonicalUrl('/', 'pl'),
			'en': createCanonicalUrl('/', 'en')
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
	params: paramsPromise,
}: {
	children: React.ReactNode
	params: Promise<Params> | Params
}) {
	const params = await Promise.resolve(paramsPromise);
	const { locale } = params;
	const messages = await import(`@/../messages/${locale}.json`).then(module => module.default)

	// Pobierz zgodę na pliki cookie z cookies
	const cookieStore = await cookies();
	const cookieConsentStr = cookieStore.get("cookieConsent")?.value;
	const consent = cookieConsentStr
		? JSON.parse(cookieConsentStr)
		: { necessary: true, analytics: false, marketing: false };

	// Pobierz tytuł strony dla komponentu DocumentTitleChanger
	const t = await getTranslations({ locale, namespace: 'Metadata' });
	const defaultTitle = t('title.default');

	// Schema.org JSON-LD dla całej witryny
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

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
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
						{/* Komponent zmieniający tytuł strony, gdy użytkownik przełączy się na inną kartę */}
						<ClientDocumentTitleWrapper defaultTitle={defaultTitle} />

						{children}
						<Toaster />
						<CookieBanner />
						<ScrollToTop />
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
