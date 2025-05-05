"use client";

import { AnimatedElement } from "@/app/components/motion/animated-element";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

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
      <Button asChild className="block w-full text-center">
        <Link
          href={isPolish ? "/#contact" : "/en/#contact"}
          
        >
        {isPolish ? "Skontaktuj się" : "Contact Us"}
        </Link>
      </Button>
    </AnimatedElement>
  );
};

export default HelpBox; 
