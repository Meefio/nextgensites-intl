import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Instrument_Sans } from "next/font/google";
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
		languages: locale === 'pl'
			? { 'en': 'https://nextgensites.pl/en' }
			: { 'pl': 'https://nextgensites.pl' }
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
			</head>
			<body suppressHydrationWarning
				className={cn(
					" font-sans antialiased scroll-smooth",
					"w-full",
					fontSans.variable,
					fontHeading.variable
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
