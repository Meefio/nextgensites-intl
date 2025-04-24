'use client'

import { Menu, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function MobileNavbar({ children }: { children: ReactNode }) {
	const t = useTranslations('Navigation')
	const kbT = useTranslations('KnowledgeBase')
	const [isOpen, setIsOpen] = useState(false)

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
					className='fixed inset-0 top-[50px] z-40 size-full overflow-auto bg-black/40 animate-in slide-in-from-bottom-24 xl:hidden'
					onClick={() => setIsOpen(false)}
				>
					<Link
						href="/#portfolio"
						className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
					>
						{t('portfolio')}
					</Link>
					<Link
						href="/baza-wiedzy"
						className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
					>
						{kbT('title')}
					</Link>
					<Link
						href="/#pricing"
						className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
					>
						{t('pricing')}
					</Link>
					{children}
				</div>
			)}
		</>
	)
}
