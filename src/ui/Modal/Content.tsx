import { ComponentProps, forwardRef, useEffect, useRef } from "react";

import useModalContext from "@/hooks/context/useModalContext";
import { cn } from "@/utils/tailwind";

import { Overlay } from "./Overlay";
import { Portal } from "./Protal";

/** Modal의 헤더와 푸터, 모달의 내용을 담는 Container 역할의 컴포넌트 */
const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useModalContext();
    const contentRef = useRef<HTMLDivElement | null>(null);

    // contentRef와 forwardRef의 참조를 동기화
    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) ref.current = node;
    };

    const handleChangeClose = () => {
      setOpen?.(false);
    };

    useEffect(() => {
      // 모달 외부 클릭 반응 로직
      const handleClickOutside = (event: MouseEvent) => {
        if (open && contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen?.(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    if (!open) return null;

    return (
      <Portal>
        <Overlay onClick={handleChangeClose} />
        <div
          ref={setRefs}
          onMouseDown={(e) => e.stopPropagation()}
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
