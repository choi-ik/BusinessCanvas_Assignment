import { createContext } from "react";

/** Modal 상태 공유 저장소 */
interface ModalContextValue {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}
const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
