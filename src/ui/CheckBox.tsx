"use client";

import { forwardRef, ComponentProps } from "react";

import useControllableState from "@/hooks/useControllableState";
import { cn } from "@/utils/tailwind";

import { Icon } from "./Icon";

interface CheckboxProps extends ComponentProps<"button"> {
  checked?: boolean;
  defaultCheck?: boolean;
  onChangeChecked?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, defaultCheck, onChangeChecked, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useControllableState<boolean>({
      prop: checked,
      onChange: onChangeChecked,
      defaultProp: defaultCheck,
    });

    const handleToggleChecked = () => {
      setInternalChecked(!internalChecked);
    };

    return (
      <button
        ref={ref}
        role="checkbox"
        onClick={handleToggleChecked}
        className={cn(
          "box-border flex h-4 w-4 items-center justify-center rounded-md border border-[#E3E3E3] bg-white",
          internalChecked && "bg-[#4A7CFE]",
          className,
        )}
        {...props}
      >
        {internalChecked && <Icon name="Check" size={12} className="text-white" />}
      </button>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
