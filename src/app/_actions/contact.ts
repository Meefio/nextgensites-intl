"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import type { ContactFormData } from "@/lib/validations/contact";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
 
export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    await resend.emails.send({
      from: 'Formularz kontaktowy <kontakt@nextgensites.pl>',
      to: ['kontakt@nextgensites.pl'],
      subject: `Nowa wiadomość: ${validatedData.subject}`,
      text: `
        Imię i nazwisko: ${validatedData.name}
        Email: ${validatedData.email}
        Temat: ${validatedData.subject}
        Wiadomość: ${validatedData.message}
        Zgoda RODO: ${validatedData.rodo ? 'Tak' : 'Nie'}
      `,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Wystąpił błąd podczas wysyłania formularza' };
  }
} 
