import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}
const Portal = ({ children }: ModalPortalProps) => {
  return createPortal(children, document.body);
};

export { Portal };
