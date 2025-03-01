import { ComponentProps, forwardRef, RefObject, useEffect, useRef } from "react";

import useSelectContext from "@/hooks/context/useSelectContext";
import { cn } from "@/utils/tailwind";

const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    const contentRef = useRef<HTMLDivElement>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as RefObject<HTMLDivElement | null>).current = node;
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <div
        ref={setRefs}
        className={cn(
          "absolute z-50 mt-1 box-border w-[12.375rem] rounded-[0.625rem] border p-1 shadow-[0px_9px_28px_8px_#0000000D,0px_3px_6px_-4px_#0000001F,0px_6px_16px_0px_#00000014]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Content.displayName = "Content";

export { Content };
