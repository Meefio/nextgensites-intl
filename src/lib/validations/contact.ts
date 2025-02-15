import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Imię musi mieć co najmniej 2 znaki.",
  }),
  email: z.string().email({
    message: "Wprowadź poprawny adres email.",
  }),
  subject: z.string().min(3, {
    message: "Temat musi mieć co najmniej 3 znaki.",
  }),
  message: z.string().min(10, {
    message: "Wiadomość musi mieć co najmniej 10 znaków.",
  }),
  rodo: z.boolean().refine((val) => val === true, {
    message: "Musisz wyrazić zgodę na przetwarzanie danych osobowych.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>; 
