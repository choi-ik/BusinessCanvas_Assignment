import { ComponentProps, forwardRef } from "react";

import { BaseField } from "@/types/field";
import { cn } from "@/utils/tailwind";

const Label = forwardRef<HTMLLabelElement, Pick<BaseField, "required"> & ComponentProps<"label">>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label ref={ref} aria-required={required} className={cn(className)} {...props}>
        <span className="opacity-45">{children}</span>
        {required && <span className="ml-1 text-[#FF4D4F]">*</span>}
      </label>
    );
  },
);

Label.displayName = "Label";

export { Label };
