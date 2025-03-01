import { ReactNode } from "react";

import { Label } from "@/ui/Label";
import { cn } from "@/utils/tailwind";

interface FormFieldProps {
  label: string;
  required?: boolean;
  id: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({ label, required, id, children, className }: FormFieldProps) {
  return (
    <div className={cn("h-[4.5rem]", className)}>
      <div className={"flex h-10 w-full items-center"}>
        <Label required={required} htmlFor={id}>
          {label}
        </Label>
      </div>
      {children}
    </div>
  );
}
