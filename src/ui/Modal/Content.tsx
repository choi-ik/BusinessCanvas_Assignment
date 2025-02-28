import { ComponentProps, forwardRef, RefObject, useEffect, useRef } from "react";

import useModalContext from "@/hooks/context/useModalContext";
import { cn } from "@/utils/tailwind";

import { Overlay } from "./Overlay";
import { Portal } from "./Protal";

const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useModalContext();
    const contentRef = useRef<HTMLDivElement>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as RefObject<HTMLDivElement | null>).current = node;
    };

    const handleChangeClose = () => {
      setOpen?.(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen?.(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setOpen]);

    if (!open) return null;

    return (
      <Portal>
        <Overlay onClick={handleChangeClose} />
        <div
          ref={setRefs}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 flex h-fit w-[32.5rem] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[0.625rem] bg-white shadow-[0px_9px_28px_8px_#0000000D,0px_3px_6px_-4px_#0000001F,0px_6px_16px_0px_#00000014] duration-200",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);
Content.displayName = "Content";

export { Content };
