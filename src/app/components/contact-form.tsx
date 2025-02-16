'use client'

import { useState, useId } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { useToast } from '@/app/hooks/use-toast'
import { Mail, Phone, Copy } from 'lucide-react'
import { Card } from '@/app/components/ui/card'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Info } from 'lucide-react'
import { AnimatedElement } from '@/app/components/motion/animated-element'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'validation.name',
	}),
	email: z.string().email({
		message: 'validation.email',
	}),
	subject: z.string().min(3, {
		message: 'validation.subject',
	}),
	message: z.string().min(10, {
		message: 'validation.message',
	}),
	rodo: z.boolean().refine((val) => val === true, {
		message: 'validation.rodo',
	}),
})

export function ContactForm() {
	const t = useTranslations('Contact')
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const email = 'kontakt@nextgensites.pl'
	const phone = '+48 694 671 786'
	const formId = useId()

	const handleCopy = (text: string, type: 'email' | 'phone') => (e: React.MouseEvent) => {
		e.stopPropagation()
		navigator.clipboard.writeText(text)
		toast({
			title: t('copied.title'),
			description: t(`copied.${type}`),
		})
	}

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
			rodo: false,
		},
		resolver: async (values) => {
			const errors: Record<string, { type: string; message: string }> = {};

			if (!values.name) {
				errors.name = {
					type: 'required',
					message: t('validation.name.required')
				};
			} else if (values.name.length < 2) {
				errors.name = {
					type: 'minLength',
					message: t('validation.name.minLength')
				};
			}

			if (!values.email) {
				errors.email = {
					type: 'required',
					message: t('validation.email.required')
				};
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = {
					type: 'pattern',
					message: t('validation.email.invalid')
				};
			}

			if (!values.subject) {
				errors.subject = {
					type: 'required',
					message: t('validation.subject.required')
				};
			} else if (values.subject.length < 3) {
				errors.subject = {
					type: 'minLength',
					message: t('validation.subject.minLength')
				};
			}

			if (!values.message) {
				errors.message = {
					type: 'required',
					message: t('validation.message.required')
				};
			} else if (values.message.length < 10) {
				errors.message = {
					type: 'minLength',
					message: t('validation.message.minLength')
				};
			}

			if (!values.rodo) {
				errors.rodo = {
					type: 'required',
					message: t('validation.rodo.required')
				};
			}

			return {
				values: Object.keys(errors).length === 0 ? values : {},
				errors: errors
			};
		}
	})

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true)

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message || t('error.message'))
			}

			toast({
				title: t('success.title'),
				description: t('success.message'),
			})

			form.reset()
		} catch (error) {
			toast({
				variant: 'destructive',
				title: t('error.title'),
				description: error instanceof Error ? error.message : t('error.message'),
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section
			id='kontakt'
			className='container flex flex-col items-center gap-6 py-14 md:py-24 sm:gap-7 scroll-mt-header'
			aria-label={t('formLabel')}
		>
			<AnimatedElement
				as="div"
				className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-full overflow-hidden'
				viewport={{ once: true, amount: 0.2 }}
			>
				<div className='grid gap-6 p-3 md:gap-16 md:p-8 lg:grid-cols-2' role='presentation'>
					{/* Contact Info Column */}
					<AnimatedElement
						as="div"
						className='space-y-4 md:space-y-8'
						direction="left"
						delay={0}
						viewport={{ once: true, amount: 0.2 }}
						role='complementary'
						aria-label={t('title')}
					>
						<AnimatedElement as="div">
							<h2 className='font-heading text-2xl font-bold md:text-3xl text-center md:text-left'>
								{t('title')}
							</h2>
							<p className='mt-2 text-sm text-muted-foreground md:text-base md:mt-4 text-center md:text-left'>
								{t('description')}
							</p>
						</AnimatedElement>

						<div className='space-y-3'>
							<AnimatedElement as="div" delay={0.1} className="@container/card">
								<Card
									className='p-3 md:p-4 transition-colors hover:bg-muted cursor-pointer'
									onClick={() => {
										if (window.getSelection()?.toString()) return
										window.location.href = `tel:${phone.replace(/\s/g, '')}`
									}}
									tabIndex={0}
									role='button'
									aria-label={`${t('phone.label')} ${phone}`}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											window.location.href = `tel:${phone.replace(/\s/g, '')}`
										}
									}}
								>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-2 md:space-x-4'>
											<div className='rounded-lg bg-primary/10 p-2 md:p-3'>
												<Phone className='h-4 w-4 md:h-5 md:w-5 text-primary' />
											</div>
											<div>
												<p className='font-medium'>{t('phone.title')}</p>
												<p
													className='text-muted-foreground select-text'
													onClick={(e) => e.stopPropagation()}
												>
													{phone}
												</p>
											</div>
										</div>
										<button
											className='p-2 rounded-md hover:bg-background transition-colors'
											onClick={handleCopy(phone, 'phone')}
											aria-label={t('phone.copyAria')}
										>
											<Copy className='h-4 w-4' />
										</button>
									</div>
								</Card>
							</AnimatedElement>

							<AnimatedElement as="div" delay={0.2} className="@container/card">
								<Card
									className='p-3 md:p-4 transition-colors hover:bg-muted cursor-pointer'
									onClick={() => {
										if (window.getSelection()?.toString()) return
										window.location.href = `mailto:${email}`
									}}
									tabIndex={0}
									role='button'
									aria-label={`Wyślij email na adres ${email}`}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											window.location.href = `mailto:${email}`
										}
									}}
								>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-2 md:space-x-4'>
											<div className='rounded-lg bg-primary/10 p-2 md:p-3'>
												<Mail className='h-4 w-4 md:h-5 md:w-5 text-primary' />
											</div>
											<div>
												<p className='font-medium'>{t('email.title')}</p>
												<p
													className='text-muted-foreground select-text'
													onClick={(e) => e.stopPropagation()}
												>
													{email}
												</p>
											</div>
										</div>
										<button
											className='p-2 rounded-md hover:bg-background transition-colors'
											onClick={handleCopy(email, 'email')}
											aria-label={t('email.copyAria')}
										>
											<Copy className='h-4 w-4' />
										</button>
									</div>
								</Card>
							</AnimatedElement>
						</div>
					</AnimatedElement>

					{/* Form Column */}
					<AnimatedElement
						as="div"
						direction="right"
						delay={0.3}
						viewport={{ once: true, amount: 0.2 }}
						className='lg:border-l lg:pl-6 xl:pl-16'
					>
						<Form {...form}>
							<form
								id={formId}
								onSubmit={form.handleSubmit(handleSubmit)}
								className='space-y-4 md:space-y-4'
								aria-label={t('formLabel')}
							>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-1'>
												{t('form.name.label')}
											</FormLabel>
											<FormControl>
												<Input placeholder={t('form.name.placeholder')} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-1'>
												{t('form.email.label')}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t('form.email.placeholder')}
													type='email'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='subject'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-1'>
												{t('form.subject.label')}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t('form.subject.placeholder')}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='message'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-1'>
												{t('form.message.label')}
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('form.message.placeholder')}
													className='min-h-[120px] resize-none'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='rodo'
									render={({ field }) => (
										<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
													aria-label={t('form.rodo.label')}
												/>
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel className='text-sm text-muted-foreground font-normal'>
													{t('form.rodo.text')}{' '}
													<Link
														href='/polityka-prywatnosci'
														className='text-primary hover:underline'
														onClick={(e) => e.stopPropagation()}
													>
														{t('form.rodo.privacyLink')}
													</Link>
													.
												</FormLabel>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<Card className="p-4 bg-muted/50 flex items-start gap-3" role="alert" aria-label={t('info.label')}>
									<Info className="h-4 w-4 mt-1 text-muted-foreground" aria-hidden="true" />
									<div>
										<p className="font-semibold text-base">
											{t('info.title')}
										</p>
										<p className="text-sm text-muted-foreground">
											{t('info.description')}
										</p>
									</div>
								</Card>

								<div className='flex justify-end'>
									<Button
										type='submit'
										size='lg'
										disabled={isLoading}
										className='w-full sm:w-auto px-3 md:px-6'
										aria-label={isLoading ? t('button.loading') : t('button.default')}
									>
										{isLoading ? t('button.loading') : t('button.default')}
									</Button>
								</div>
							</form>
						</Form>
					</AnimatedElement>
				</div>
			</AnimatedElement>
		</section>
	)
}
