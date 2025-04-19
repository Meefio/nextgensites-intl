import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("Faq");
  const allQuestions = ["Question1", "Question2", "Question4", "Question5", "Question6", "Question8"];
  const firstHalf = allQuestions.slice(0, 3);
  const secondHalf = allQuestions.slice(3);

  return (
    <section className="container flex flex-col items-center gap-6 pt-14 pb-24 md:py-24 sm:gap-7">
      <AnimatedElement className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">{t("why")}</span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          {t("heading")}
        </h2>
        <p
          className="text-lg text-muted-foreground text-balance max-w-lg text-center"
          dangerouslySetInnerHTML={{ __html: t.raw("subheading") }}
        />
      </AnimatedElement>

      <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
        <AnimatedElement
          direction="left"
          delay={0.2}
          className="rounded-lg border bg-card px-6 shadow-sm h-fit"
        >
          <Accordion type="single" collapsible>
            {firstHalf.map((key) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="py-4 text-left text-base hover:no-underline" id={`faq-question-${key}`}>
                  {t(`questions.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                  <div dangerouslySetInnerHTML={{ __html: t.raw(`questions.${key}.answer`) }} />
                </AccordionContent>
              </AccordionItem>
            ))}
            <div className="md:hidden">
              {secondHalf.map((key) => (
                <AccordionItem key={`mobile-${key}`} value={`mobile-${key}`}>
                  <AccordionTrigger className="py-4 text-left text-base hover:no-underline" id={`faq-question-mobile-${key}`}>
                    {t(`questions.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                    <div dangerouslySetInnerHTML={{ __html: t.raw(`questions.${key}.answer`) }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        </AnimatedElement>

        <AnimatedElement
          direction="right"
          delay={0.3}
          className="rounded-lg border bg-card px-6 shadow-sm h-fit hidden md:block"
        >
          <Accordion type="single" collapsible>
            {secondHalf.map((key) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="py-4 text-left text-base hover:no-underline" id={`faq-question-${key}`}>
                  {t(`questions.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                  <div dangerouslySetInnerHTML={{ __html: t.raw(`questions.${key}.answer`) }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedElement>
      </div>
    </section>
  );
}
