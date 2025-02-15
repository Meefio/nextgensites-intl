import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import { AnimatedElement } from "@/app/components/motion/animated-element";

export function Faq() {
  return (
    <section className="flex flex-col items-center gap-6 pt-14 pb-24 md:py-24 sm:gap-7">
      <AnimatedElement className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Faq</span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Najczęściej zadawane pytania
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
          Jeśli masz jakieś dodatkowe pytania, napisz do nas!
        </p>
      </AnimatedElement>
      
      <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
        <AnimatedElement 
          direction="left" 
          delay={0.2} 
          className="rounded-lg border bg-card p-6 shadow-sm h-fit"
        >
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-0">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Co zawiera cena strony internetowej?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
              W cenie strony otrzymujesz kompleksową usługę obejmującą: projekt i wdrożenie strony, roczny hosting i domenę, certyfikat SSL, optymalizację SEO, responsywny design, integrację Google Analytics oraz Google Search Console, wsparcie techniczne przez 12 miesięcy, politykę RODO i cookies. Pakiety wyższe dodatkowo zawierają system CMS, blog, monitoring wydajności i zaawansowaną analitykę.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Dlaczego model subskrypcyjny jest korzystny?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                Model subskrypcyjny pozwala na rozpoczęcie działalności online bez dużych kosztów początkowych. 
                Miesięczna opłata obejmuje nie tylko hosting, ale także bieżące wsparcie techniczne, 
                aktualizacje bezpieczeństwa i możliwość rozwoju strony wraz z rozwojem Twojego biznesu. 
                To elastyczne rozwiązanie, które możesz dostosować do swoich potrzeb i budżetu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Ile czasu zajmuje stworzenie strony?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                Czas realizacji zależy od złożoności projektu i wybranego pakietu. Standardowa strona 
                w pakiecie podstawowym może być gotowa w ciągu 1-2 tygodni. Bardziej rozbudowane projekty, 
                zawierające system CMS czy blog, mogą zająć 2-4 tygodni. Na czas realizacji wpływa również 
                szybkość dostarczenia materiałów przez klienta (teksty, zdjęcia, logo).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Czy mogę samodzielnie edytować treści na stronie?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                Tak, w pakietach Pro i Indywidualnym otrzymujesz dostęp do systemu CMS (Strapi), który 
                pozwala na samodzielną edycję treści, zdjęć i innych elementów strony bez znajomości 
                programowania. System jest intuicyjny i przyjazny dla użytkownika, a my zapewniamy 
                szkolenie z jego obsługi.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AnimatedElement>

        <AnimatedElement 
          direction="right" 
          delay={0.3} 
          className="rounded-lg border bg-card p-6 shadow-sm h-fit"
        >
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-4">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Jakie wsparcie techniczne otrzymuję?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                Zapewniamy bieżące wsparcie techniczne, które obejmuje monitoring działania strony, 
                aktualizacje bezpieczeństwa, kopie zapasowe oraz pomoc w przypadku problemów technicznych. 
                W pakiecie Pro oferujemy priorytetowe wsparcie oraz dodatkowe usługi monitoringu 
                wydajności poprzez Sentry i analizę zachowań użytkowników przez PostHog.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Co wyróżnia wasze strony na tle konkurencji?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                Nasze strony są budowane w oparciu o Next.js - nowoczesną technologię wykorzystywaną przez 
                największe firmy jak Netflix czy TikTok. Zapewnia to wyjątkową wydajność, szybkość 
                ładowania i optymalizację pod SEO. W przeciwieństwie do stron opartych na WordPressie, 
                nasze rozwiązania są bardziej bezpieczne, szybsze i lepiej zoptymalizowane pod kątem 
                wyszukiwarek.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Jak wygląda kwestia własności strony?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                W przypadku jednorazowej opłaty za stronę, otrzymujesz pełne prawa własności do kodu oraz 
                wszystkie niezbędne dostępy już pierwszego dnia. Przy modelu subskrypcyjnym możesz 
                zrezygnować z usługi z miesięcznym okresem wypowiedzenia, jednak pełne prawa własności 
                do kodu strony przechodzą na Ciebie po 3 latach regularnych płatności.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                Co jeśli chcę zrezygnować z usługi?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pt-2 pb-4">
                W przypadku rezygnacji z usługi przed ukończeniem trzeciego roku, otrzymujesz dostęp do domeny jednak nie będziesz miał już praw do korzystania z kodu strony. Nie stosujemy długoterminowych zobowiązań - możesz zrezygnować z usługi w dowolnym momencie z zachowaniem miesięcznego okresu wypowiedzenia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AnimatedElement>
      </div>
    </section>
  );
}
