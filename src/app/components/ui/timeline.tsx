'use client'
import {
	useScroll,
	useTransform,
	motion,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { useTranslations } from 'next-intl'

interface TimelineEntry {
	title: string
	content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
	const t = useTranslations('Timeline')
	const ref = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			setHeight(rect.height)
		}
	}, [ref])

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 10%', 'end 50%'],
	})

	const heightTransform = useTransform(
		scrollYProgress,
		[0, 1],
		[0, height]
	)
	const opacityTransform = useTransform(
		scrollYProgress,
		[0, 0.1],
		[0, 1]
	)

	return (
		<section
			id='proces'
			className='container relative mx-auto flex flex-col items-center py-14 md:pt-24 md:px-10 max-w-5xl scroll-mt-header'
			ref={containerRef}
		>
			<div className="text-center mb-12">
				<AnimatedElement
					className="flex flex-col gap-3"
					delay={0.2}
					viewport={{ once: true, margin: "-20% 0px" }}
				>
					<span className='font-bold uppercase text-primary'>
						{t('why')}
					</span>
					<h2 className='font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance max-w-[800px] mx-auto'>
						{t('heading')}
					</h2>
					<p className='text-lg text-muted-foreground text-balance max-w-[800px] mx-auto'>
						{t('subheading')}
					</p>
				</AnimatedElement>
			</div>

			<div ref={ref} className='relative mx-auto'>
				{data.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, margin: "-20%" }}
						transition={{ duration: 0.5 }}
						className='grid grid-cols-6 pt-10 md:pt-14 gap-x-14'
					>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, margin: "-20%" }}
							transition={{ duration: 0.5 }}
							className='col-span-3 flex items-center z-40 top-40 self-start'
						>
							<div className='h-14 absolute left-3 w-10 rounded-full bg-background flex items-center justify-center'>
								<div className='h-4 w-4 rounded-full bg-muted-foreground p-2' />
							</div>
							<motion.h3
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true, margin: "-20%" }}
								transition={{ duration: 0.5 }}
								className='hidden md:block text-lg md:pl-20 md:text-lg font-bold text-muted-foreground'
							>
								{item.title}
							</motion.h3>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, margin: "-20%" }}
							transition={{ duration: 0.5 }}
							className='col-span-6 md:col-span-3 relative pl-20 pr-4 md:pl-4'
						>
							<motion.h3
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true, margin: "-20%" }}
								transition={{ duration: 0.5 }}
								className='-mt-[14px] md:hidden block text-lg mb-4 text-left font-bold text-muted-foreground'
							>
								{item.title}
							</motion.h3>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true, margin: "-20%" }}
								transition={{ duration: 0.5 }}
							>
								{item.content}
							</motion.div>
						</motion.div>
					</motion.div>
				))}
				<div
					// style={{ height: height + 'px' }}
					className='h-[100%] absolute left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-muted-foreground to-transparent'
				>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className='absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary to-transparent rounded-full'
					/>
				</div>
			</div>
		</section>
	)
}
