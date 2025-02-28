"use client";

import { ComponentProps } from "react";

import useControllableState from "@/hooks/useControllableState";

import { Close } from "./Close";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import ModalContext from "./Store";
import { Trigger } from "./Trigger";

interface ModalProps extends ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function ModalRoot({ children, open, onOpenChange, defaultOpen, ...props }: ModalProps) {
  const [internalOpen = false, setInternalOpen] = useControllableState({
    prop: open,
    onChange: onOpenChange,
    defaultProp: defaultOpen,
  });

  return (
    <ModalContext.Provider value={{ open: internalOpen, setOpen: setInternalOpen }}>
      <div {...props}>{children}</div>
    </ModalContext.Provider>
  );
}

const Modal = Object.assign(ModalRoot, {
  Trigger,
  Content,
  Header,
  Footer,
  Close,
});

export { Modal };
