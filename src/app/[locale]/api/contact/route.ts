import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/app/components/emails/contact-form-email";
import { contactFormSchema } from "@/lib/validations/contact";

// Sprawdzamy czy klucz API istnieje
if (!process.env.RESEND_API_KEY) {
  throw new Error("Brak klucza API Resend");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    // Walidacja danych po stronie serwera
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane formularza" },
        { status: 400 }
      );
    }

    const { name, email, subject, message, rodo } = result.data;

    await resend.emails.send({
      from: "NextGen Sites <onboarding@resend.dev>",
      to: ["kontakt@nextgensites.pl"],
      subject: `Nowa wiadomość: ${subject}`,
      react: ContactFormEmail({
        name,
        email,
        subject,
        message,
        rodo: rodo ? "Tak" : "Nie",
      }),
    });

    return NextResponse.json(
      { message: "Wiadomość wysłana pomyślnie" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wysyłania wiadomości" },
      { status: 500 }
    );
  }
} 
