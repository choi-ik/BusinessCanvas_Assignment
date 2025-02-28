import { ComponentProps, forwardRef } from "react";

import useModalContext from "@/hooks/context/useModalContext";
import { cn } from "@/utils/tailwind";

const Trigger = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ children, className, ...props }, ref) => {
    const { setOpen } = useModalContext();

    const handleChangeOpen = () => {
      setOpen?.(true);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleChangeOpen}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Trigger.displayName = "Trigger";

export { Trigger };
