import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

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
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
