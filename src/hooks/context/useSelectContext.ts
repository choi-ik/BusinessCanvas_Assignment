import { useContext } from "react";

import SelectContext from "@/ui/Select/Store";

const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(`Select Components must be used within a <Select> component.`);
  }

  return context;
};

export default useSelectContext;
