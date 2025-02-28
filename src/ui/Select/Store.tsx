import { createContext } from "react";

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export default SelectContext;
