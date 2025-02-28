import { createContext } from "react";

interface ModalContextValue {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}
const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
