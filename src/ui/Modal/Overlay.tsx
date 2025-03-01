import { ComponentProps, forwardRef } from "react";

import { cn } from "@/utils/tailwind";

const Overlay = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("fixed inset-0 z-30 bg-black/45", className)} {...props} />;
  },
);
Overlay.displayName = "Overlay";

export { Overlay };
