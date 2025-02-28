import { ComponentProps, forwardRef } from "react";

import { cn } from "@/utils/tailwind";

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group box-border h-8 w-[4.563rem] rounded-lg bg-[#4A7CFE] px-[0.688rem] text-white transition-colors hover:bg-[#739FFF] active:bg-[#345DD9] disabled:cursor-not-allowed disabled:border disabled:border-[#E3E3E3] disabled:bg-black/[.04]",
          className,
        )}
        {...props}
      >
        <div className="flex h-full w-full items-center justify-center gap-2 group-disabled:text-black group-disabled:opacity-25">
          {children}
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
