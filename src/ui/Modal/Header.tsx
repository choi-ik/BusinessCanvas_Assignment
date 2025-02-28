import { ComponentProps } from "react";

import { cn } from "@/utils/tailwind";

function Header({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-[2.875rem] w-full border-b border-[#F0F0F0] px-4 py-3 text-sm font-semibold",
        className,
      )}
      {...props}
    />
  );
}
Header.displayName = "Header";

export { Header };
