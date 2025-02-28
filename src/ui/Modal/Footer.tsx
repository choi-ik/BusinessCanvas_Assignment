import { ComponentProps } from "react";

import { cn } from "@/utils/tailwind";

function Footer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-14 w-full items-center justify-end gap-2 border-t border-black/[.06] bg-black/[.02] px-4 py-3",
        className,
      )}
      {...props}
    />
  );
}
Footer.displayName = "Footer";

export { Footer };
