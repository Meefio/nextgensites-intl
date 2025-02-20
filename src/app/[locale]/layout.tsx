import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Instrument_Sans } from "next/font/google";
import '../globals.css'
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/components/theme-provider"
import { Toaster } from "@/app/components/ui/toaster";
import { CookieBanner } from "@/app/components/cookie-banner";

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'NextGen Sites - Tworzenie stron internetowych',
	description: 'Tworzymy szybkie, zoptymalizowane i nowoczesne strony w najnowszej technologii Next.js 15+. Doskonały wygląd, SEO, mobilna responsywność i niskie koszty utrzymania – wszystko w jednej ofercie.',
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
	const messages = (await import(`@/messages/${locale}.json`)).default

	return (
		<html lang={locale} suppressHydrationWarning>
			<body suppressHydrationWarning
				className={cn(
					"min-h-screen font-sans antialiased scroll-smooth",
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
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}
