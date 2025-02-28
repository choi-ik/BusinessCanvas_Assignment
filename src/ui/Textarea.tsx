import * as React from "react";

import { cn } from "@/utils/tailwind";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "border-input box-border flex h-16 w-80 rounded-[0.625rem] border bg-white px-[0.688rem] py-[0.25rem] transition-colors hover:border-[#4A7CFE] focus:border-[#4A7CFE] focus:shadow-[0px_0px_0px_2px_#4A7CFE26] focus-visible:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
