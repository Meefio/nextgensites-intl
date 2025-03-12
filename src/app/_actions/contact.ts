"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import type { ContactFormData } from "@/lib/validations/contact";
import { Resend } from 'resend';
import { ContactFormEmail } from '@/app/components/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormData) {
  try {

    const validatedData = contactFormSchema.parse(data);

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Brak klucza API Resend');
    }

    await resend.emails.send({
      from: 'Formularz kontaktowy <kontakt@nextgensites.pl>',
      to: ['kontakt@nextgensites.pl'],
      subject: `Nowa wiadomość: ${validatedData.subject}`,
      react: ContactFormEmail({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        rodo: validatedData.rodo ? 'Tak' : 'Nie'
      }),
    });


    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Wystąpił nieznany błąd podczas wysyłania formularza'
    };
  }
} 
