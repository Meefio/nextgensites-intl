'use client'

import { Menu, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export function MobileNavbar({ children }: { children: ReactNode }) {
	const t = useTranslations('Navigation')
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

	useEffect(() => {
		const overlay = document.getElementById('backdrop-overlay')
		if (overlay) {
			overlay.className = isOpen
				? 'fixed inset-0 top-[64px] z-20 bg-background/80 backdrop-blur-sm pointer-events-auto cursor-pointer'
				: 'fixed inset-0 top-[64px] z-20 bg-transparent pointer-events-none transition-colors duration-300'

			const handleOverlayClick = () => setIsOpen(false)

			if (isOpen) {
				overlay.addEventListener('click', handleOverlayClick)
			}

			return () => {
				overlay.removeEventListener('click', handleOverlayClick)
			}
		}
	}, [isOpen])

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
					className='fixed inset-0 top-[0px] z-40 size-full overflow-auto animate-in slide-in-from-bottom-24 xl:hidden'
					onClick={() => setIsOpen(false)}
				>
					{children}
				</div>
			)}
		</>
	)
}
