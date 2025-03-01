import { ComponentProps, useState } from "react";

import useControllableState from "@/hooks/useControllableState";

import { Content } from "./Content";
import { Item } from "./Item";
import SelectContext from "./Store";
import { Trigger } from "./Trigger";

interface SelectProps extends ComponentProps<"div"> {
  selectedValue?: string;
  onSelectedValue?: (value: string) => void;
  defaultValue?: string;
}

function SelectRoot({
  children,
  selectedValue: externalSelectedValue,
  onSelectedValue: externalOnSelectedValue,
  defaultValue,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useControllableState<string>({
    prop: externalSelectedValue,
    onChange: externalOnSelectedValue,
    defaultProp: defaultValue,
  });

  return (
    <SelectContext.Provider value={{ open, setOpen, selectedValue, setSelectedValue }}>
      <div className="relative h-fit w-fit" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

const Select = Object.assign(SelectRoot, {
  Trigger,
  Item,
  Content,
});

export { Select };
