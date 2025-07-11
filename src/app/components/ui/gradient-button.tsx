import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-primary-foreground border-0",
        outline: "border bg-background",
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

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof gradientButtonVariants> {
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({
    className,
    variant,
    size,
    gradientFrom = "from-primary",
    gradientTo = "to-accent",
    children,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={cn(
          "absolute inset-0 bg-linear-to-r animate-shimmer",
          gradientFrom,
          gradientTo,
          variant === "outline" ? "opacity-0 hover:opacity-100 transition-opacity" : ""
        )}
          style={{ "--shimmer-width": "50%" } as React.CSSProperties}
          aria-hidden="true"
        />

        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </button>
    );
  },
);

GradientButton.displayName = "GradientButton";

export { GradientButton, gradientButtonVariants }; 
