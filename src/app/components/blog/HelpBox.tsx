"use client";

import { AnimatedElement } from "@/app/components/motion/animated-element";
import Link from "next/link";

interface HelpBoxProps {
  locale: string;
}

const HelpBox = ({ locale }: HelpBoxProps) => {
  const isPolish = locale === "pl";

  return (
    <AnimatedElement
      className="p-6 border rounded-xl bg-card"
      direction="right"
      delay={0.3}
    >
      <h3 className="font-semibold text-lg mb-3">
        {isPolish ? "Potrzebujesz pomocy?" : "Need help?"}
      </h3>
      <p className="text-muted-foreground mb-4">
        {isPolish
          ? "Skontaktuj się z nami, aby uzyskać bezpłatną konsultację dotyczącą Twojego projektu."
          : "Contact us for a free consultation about your project."
        }
      </p>
      <Link
        href={isPolish ? "/#contact" : "/en/#contact"}
        className="block w-full bg-primary text-white dark:text-primary-foreground text-center py-2 px-4 rounded-md hover:bg-primary/90 transition"
      >
        {isPolish ? "Skontaktuj się" : "Contact Us"}
      </Link>
    </AnimatedElement>
  );
};

export default HelpBox; 
