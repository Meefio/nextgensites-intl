"use client"

import Image from "next/image"
import { AnimatedElement } from "@/app/components/motion/animated-element"

export function About() {
  return (
    <section
      id="o-nas"
      className="container py-14 md:py-20 scroll-mt-header"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Lewa kolumna z tekstem */}
        <div className="flex flex-col gap-6">
          <AnimatedElement
            className="flex flex-col gap-3"
            delay={0.2}
            viewport={{ once: true, margin: "-20% 0px" }}
          >
            <span className="font-bold uppercase text-primary">
              Poznaj nasze podejście
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              Tworzymy strony, które przynoszą rezultaty
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Łączymy nowoczesne technologie z przemyślanym designem, by Twoja strona wyróżniała się na tle konkurencji
            </p>
          </AnimatedElement>

          <AnimatedElement
            className="mt-4 space-y-6"
            delay={0.3}
            viewport={{ once: true, margin: "-20% 0px" }}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Stawiamy na najnowocześniejsze rozwiązania, wykorzystując potencjał Next.js 15+, co przekłada się na błyskawiczne ładowanie i doskonałą optymalizację. Nasze strony są wielojęzyczne w standardzie, wyposażone w tryb ciemny/jasny i perfekcyjnie dostosowane do wszystkich urządzeń.
              </p>
              <p className="text-muted-foreground">
                W przeciwieństwie do przestarzałych rozwiązań opartych na WordPress, oferujemy stabilną i szybką technologię, która nie zawodzi. Każdy projekt traktujemy indywidualnie - nie korzystamy z gotowych szablonów, a instead tworzymy unikalne rozwiązania dopasowane do Twoich potrzeb.
              </p>
              <p className="text-muted-foreground">
                Wyróżniamy się nie tylko technologią, ale także atrakcyjnymi animacjami i elementami 3D, które przyciągają uwagę użytkowników. A to wszystko w konkurencyjnej cenie i z niskimi kosztami utrzymania.
              </p>
            </div>
          </AnimatedElement>
        </div>

        {/* Prawa kolumna ze zdjęciem */}
        <AnimatedElement
          className="relative h-[600px] w-full"
          delay={0.4}
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          <div className="absolute inset-0 rounded-2xl">
            <div className="relative h-full w-full">
              <Image
                src="/images/my-photo.png"
                alt="Zdjęcie właściciela"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
} 
