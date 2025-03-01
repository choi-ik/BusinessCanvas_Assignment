import { Children, cloneElement, ComponentProps, forwardRef, ReactElement } from "react";

import useModalContext from "@/hooks/context/useModalContext";
import { cn } from "@/utils/tailwind";

interface ModalTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

const Trigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const { setOpen } = useModalContext();

    const handleChangeOpen = () => {
      setOpen?.(true);
    };

    if (asChild) {
      return cloneElement(Children.only(children as ReactElement), {
        onClick: handleChangeOpen,
      });
    }

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
