'use client'

import { useState, useId } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/components/ui/button'
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
// import {
// 	Alert,
// 	AlertDescription,
// 	AlertTitle,
// } from '@/app/components/ui/alert'
import { Info } from 'lucide-react'
import { AnimatedElement } from '@/app/components/motion/animated-element'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Imię musi mieć co najmniej 2 znaki.',
	}),
	email: z.string().email({
		message: 'Wprowadź poprawny adres email.',
	}),
	subject: z.string().min(3, {
		message: 'Temat musi mieć co najmniej 3 znaki.',
	}),
	message: z.string().min(10, {
		message: 'Wiadomość musi mieć co najmniej 10 znaków.',
	}),
	rodo: z.boolean().refine((val) => val === true, {
		message:
			'Musisz wyrazić zgodę na przetwarzanie danych osobowych.',
	}),
})

export function ContactForm() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const email = 'kontakt@nextgensites.pl'
	const phone = '+48 694 671 786'
	const formId = useId()

	const handleCopy =
		(text: string, type: 'email' | 'telefon') =>
			(e: React.MouseEvent) => {
				e.stopPropagation()
				navigator.clipboard.writeText(text)
				toast({
					title: 'Skopiowano!',
					description: `${type === 'email' ? 'Adres email' : 'Numer telefonu'} został skopiowany do schowka.`,
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
					message: 'Imię jest wymagane'
				};
			} else if (values.name.length < 2) {
				errors.name = {
					type: 'minLength',
					message: 'Imię musi mieć co najmniej 2 znaki'
				};
			}

			if (!values.email) {
				errors.email = {
					type: 'required',
					message: 'Email jest wymagany'
				};
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = {
					type: 'pattern',
					message: 'Wprowadź poprawny adres email'
				};
			}

			if (!values.subject) {
				errors.subject = {
					type: 'required',
					message: 'Temat jest wymagany'
				};
			} else if (values.subject.length < 3) {
				errors.subject = {
					type: 'minLength',
					message: 'Temat musi mieć co najmniej 3 znaki'
				};
			}

			if (!values.message) {
				errors.message = {
					type: 'required',
					message: 'Wiadomość jest wymagana'
				};
			} else if (values.message.length < 10) {
				errors.message = {
					type: 'minLength',
					message: 'Wiadomość musi mieć co najmniej 10 znaków'
				};
			}

			if (!values.rodo) {
				errors.rodo = {
					type: 'required',
					message: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych'
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
				throw new Error(
					error.message ||
					'Wystąpił błąd podczas wysyłania wiadomości'
				)
			}

			toast({
				title: 'Sukces!',
				description: 'Twoja wiadomość została wysłana pomyślnie.',
			})

			form.reset()
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Błąd!',
				description:
					error instanceof Error
						? error.message
						: 'Wystąpił błąd podczas wysyłania wiadomości',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section
			id='kontakt'
			className='container flex flex-col items-center gap-6 py-14 md:py-24 sm:gap-7 scroll-mt-header'
			aria-label='Formularz kontaktowy'
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
						aria-label='Informacje kontaktowe'
					>
						<AnimatedElement as="div">
							<h2 className='font-heading text-2xl font-bold md:text-3xl text-center md:text-left'>
								Skontaktuj się z nami
							</h2>
							<p className='mt-2 text-sm text-muted-foreground md:text-base md:mt-4 text-center md:text-left'>
								Masz pytania? Napisz do nas, a my odpowiemy w ciągu 24
								godzin!
							</p>
						</AnimatedElement>

						<div className='space-y-3'>
							<AnimatedElement as="div" delay={0.1} className="@container/card">
								<Card
									className='p-3 md:p-4 transition-colors hover:bg-muted cursor-pointer'
									onClick={(e) => {
										// Sprawdzamy czy tekst nie jest zaznaczany
										if (window.getSelection()?.toString()) return
										window.location.href = `tel:${phone.replace(/\s/g, '')}`
									}}
									tabIndex={0}
									role='button'
									aria-label={`Zadzwoń pod numer ${phone}`}
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
												<p className='font-medium'>Telefon</p>
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
											onClick={handleCopy(phone, 'telefon')}
											aria-label='Kopiuj numer telefonu'
										>
											<Copy className='h-4 w-4' />
										</button>
									</div>
								</Card>
							</AnimatedElement>

							<AnimatedElement as="div" delay={0.2} className="@container/card">
								<Card
									className='p-3 md:p-4 transition-colors hover:bg-muted cursor-pointer'
									onClick={(e) => {
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
												<p className='font-medium'>Email</p>
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
											aria-label='Kopiuj adres email'
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
								aria-label='Formularz wysyłania wiadomości'
							>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-1'>
												Jak możemy się do Ciebie zwracać?
											</FormLabel>
											<FormControl>
												<Input placeholder='Twoje imię' {...field} />
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
												Gdzie mamy wysłać odpowiedź?
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Twój email'
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
												W czym możemy Ci pomóc?
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Temat wiadomości'
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
												Opowiedz nam o swoim projekcie
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Wiadomość'
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
													aria-label='Zgoda na przetwarzanie danych osobowych'
												/>
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel className='text-sm text-muted-foreground font-normal'>
													Wyrażam zgodę na przetwarzanie moich danych
													osobowych zgodnie z{' '}
													<a
														href='/polityka-prywatnosci'
														className='text-primary hover:underline'
														onClick={(e) => e.stopPropagation()}
													>
														polityką prywatności
													</a>
													.
												</FormLabel>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								{/* <Alert role="alert" aria-label="Informacja o czasie odpowiedzi">
									<Info className="h-4 w-4" aria-hidden="true" />
									<AlertTitle className="text-base font-semibold">
										Szybko odpowiadamy!
									</AlertTitle>
									<AlertDescription>
										Zazwyczaj odpisujemy w ciągu 24 godzin w dni robocze.
									</AlertDescription>
								</Alert> */}

								<div className='flex justify-end'>
									<Button
										type='submit'
										size='lg'
										disabled={isLoading}
										className='w-full sm:w-auto px-3 md:px-6'
										aria-label={
											isLoading
												? 'Trwa wysyłanie wiadomości'
												: 'Wyślij wiadomość'
										}
									>
										{isLoading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
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
