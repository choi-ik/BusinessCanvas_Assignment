import { ComponentProps, forwardRef } from "react";

import useSelectContext from "@/hooks/context/useSelectContext";
import { cn } from "@/utils/tailwind";

import { Icon } from "../Icon";

const Trigger = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, selectedValue } = useSelectContext();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-8 min-w-[5.313rem] whitespace-nowrap rounded-lg border border-[#E3E3E3] bg-white px-3 text-sm hover:border-[#739FFF] hover:px-4 hover:text-[#4A7CFE]",
          className,
        )}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <div className="flex w-full items-center justify-between">
          {selectedValue || children}
          <Icon name="ChevronDown" size={16} />
        </div>
      </button>
    );
  },
);
Trigger.displayName = "Trigger";

export { Trigger };
