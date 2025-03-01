import { createContext } from "react";

/** Select 상태 공유 저장소 */
interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export default SelectContext;
