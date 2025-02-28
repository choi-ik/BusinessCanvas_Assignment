import * as React from "react";

import { cn } from "@/utils/tailwind";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "box-border flex h-8 w-[22.5rem] rounded-lg border border-[#E3E3E3] bg-white px-[0.688rem] transition-colors hover:border-[#4A7CFE] focus:border-[#4A7CFE] focus:shadow-[0px_0px_0px_2px_#4A7CFE26] focus-visible:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
