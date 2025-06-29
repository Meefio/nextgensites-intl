'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import NextLink from 'next/link'
import { Button } from './ui/button'

export function MobileNavbar() {
	const t = useTranslations('Navigation')
	const locale = useLocale()
	const [isOpen, setIsOpen] = useState(false)

	// Determine the correct knowledge base path with absolute URL
	const kbAbsolutePath = locale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy'
	// Framer templates path
	const framerTemplatesPath = locale === 'en' ? '/en/szablony-framer' : '/szablony-framer'
	// Root path based on locale
	const rootPath = locale === 'en' ? '/en' : '/'

	useEffect(() => {
		const overflow = isOpen ? 'hidden' : 'auto'
		document.documentElement.style.overflow = overflow
	}, [isOpen])

	useEffect(() => {
		const closeHamburgerNavigation = () => setIsOpen(false)
		window.addEventListener(
			'orientationchange',
			closeHamburgerNavigation
		)
		window.addEventListener('resize', closeHamburgerNavigation)

		return () => {
			window.removeEventListener(
				'orientationchange',
				closeHamburgerNavigation
			)
			window.removeEventListener('resize', closeHamburgerNavigation)
		}
	}, [])

	return (
		<>
			<button
				className='xl:hidden px-2'
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? t('closeMenu') : t('openMenu')}
				aria-expanded={isOpen}
				aria-controls='mobile-menu'
			>
				{isOpen ? <X /> : <Menu />}
			</button>
			{isOpen && (
				<div
					id='mobile-menu'
					role='dialog'
					aria-modal='true'
					aria-label={t('navigationMenu')}
					className='fixed left-0 right-0 top-[var(--header-height)] z-40 h-[calc(100vh-var(--header-height))] overflow-auto bg-black/40 animate-in fade-in-0 xl:hidden'
					onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
				>
					<div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl" onClick={(e) => e.stopPropagation()}>
						<nav className="flex flex-col gap-1 pt-2">
							<NextLink
								href={`${rootPath}#benefits`}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{t('benefits')}
							</NextLink>
							<NextLink
								href={`${rootPath}#portfolio`}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{t('portfolio')}
							</NextLink>
							{/* <NextLink
								href={`${rootPath}#pricing`}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{t('pricing')}
							</NextLink> */}
							<NextLink
								href={framerTemplatesPath}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{t('framerTemplates')}
							</NextLink>
							<NextLink
								href={`${rootPath}#contact`}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{t('contact')}
							</NextLink>
							<NextLink
								href={kbAbsolutePath}
								className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => setIsOpen(false)}
							>
								{locale === 'pl' ? 'Baza Wiedzy' : 'Knowledge Base'}
							</NextLink>
							<Button size="lg" asChild className="mt-2 w-full">
								<NextLink
									href={`${rootPath}#contact`}
									className="cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									{t('getFreeQuote')}
								</NextLink>
							</Button>
						</nav>
					</div>
				</div>
			)}
		</>
	)
}
