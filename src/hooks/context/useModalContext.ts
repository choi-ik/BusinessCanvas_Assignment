import { useContext } from "react";

import ModalContext from "@/ui/Modal/Store";

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`Modal Components must be used within a <Modal> component.`);
  }

  return context;
};

export default useModalContext;
