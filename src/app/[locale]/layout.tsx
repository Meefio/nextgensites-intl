import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Instrument_Sans } from "next/font/google";
import '../globals.css'
import { cn } from "@/lib/utils";

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
		<html lang={locale} className="scroll-smooth">
			<body
				 className={cn(
					"min-h-screen font-sans antialiased max-w-100vw overflow-x-hidden",
					fontSans.variable,
					fontHeading.variable
				 )}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}
