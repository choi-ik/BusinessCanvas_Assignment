import { ComponentProps, forwardRef, useEffect, useRef } from "react";

import useSelectContext from "@/hooks/context/useSelectContext";
import { cn } from "@/utils/tailwind";

/** Select의 Item 컴포넌트를 포함하는 Container 역할의 컴포넌트 */
const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    const contentRef = useRef<HTMLDivElement | null>(null);

    // contentRef와 forwardRef의 참조를 동기화
    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) ref.current = node;
    };

    useEffect(() => {
      // Select 외부 클릭 반응 로직
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
    }, []);

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
