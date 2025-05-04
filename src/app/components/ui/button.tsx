import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/90 before:to-orange-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-md before:-z-10",
          "z-0" // Ensures content stays above the pseudo-element
        ].join(" "),
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: [
          "border-2 border-foreground/20 bg-transparent text-foreground shadow-sm",
          "hover:border-primary/70 hover:text-primary hover:shadow-md",
          "before:absolute before:inset-0 before:bg-primary/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-md before:-z-10",
          "transition-all duration-300 z-0"
        ].join(" "),
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
