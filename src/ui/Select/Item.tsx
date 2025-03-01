import { ComponentProps, forwardRef } from "react";

import useSelectContext from "@/hooks/context/useSelectContext";
import { cn } from "@/utils/tailwind";

const Item = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, children, ...props }, ref) => {
    const { selectedValue, setSelectedValue, setOpen } = useSelectContext();

    const itemValue = typeof children === "string" ? children : "";

    const handleClickSelectValue = () => {
      setSelectedValue?.(itemValue);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-8 w-[11.875rem] items-center rounded-md px-3 py-[0.313rem] text-sm hover:bg-black/[.04]",
          selectedValue === itemValue && "bg-[#F0F7FF] text-[#4A7CFE]",
          className,
        )}
        onClick={handleClickSelectValue}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Item.displayName = "Item";

export { Item };
