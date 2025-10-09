import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  subtle?: boolean;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, asChild = false, subtle = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "glow-btn",
          subtle && "glow-btn--subtle",
          className,
        )}
        {...props}
      />
    );
  },
);

GlowButton.displayName = "GlowButton";

export { GlowButton };


