import { ComponentProps, forwardRef } from "react";

import useModalContext from "@/hooks/context/useModalContext";
import { cn } from "@/utils/tailwind";

import { Icon } from "../Icon";

const Close = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useModalContext();

    const handleClickClose = () => {
      setOpen?.(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClickClose}
        className={cn("opacity-70 transition-opacity hover:opacity-100", className)}
        {...props}
      >
        <Icon name="X" size={22} className="text-black/45" />
        <span className="sr-only">Close</span>
      </button>
    );
  },
);
Close.displayName = "Close";

export { Close };
