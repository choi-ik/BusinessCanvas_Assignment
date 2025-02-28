import { icons, LucideProps } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/utils/tailwind";

export type IconNames = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconNames;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({ className, name, ...props }, ref) => {
  const SelectedLucideIcon = icons[name];

  return <SelectedLucideIcon ref={ref} name={name} className={cn(className)} {...props} />;
});

Icon.displayName = "Icon";

export { Icon };
