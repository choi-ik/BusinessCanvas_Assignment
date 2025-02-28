import { ComponentProps, Dispatch, SetStateAction, useCallback, useState } from "react";

import { Content } from "./Content";
import { Item } from "./Item";
import SelectContext from "./Store";
import { Trigger } from "./Trigger";

interface SelectProps extends ComponentProps<"div"> {
  selectedValue?: string;
  onSelectedValue?: (value: string) => void;
}

function SelectRoot({
  children,
  selectedValue: externalSelectedValue,
  onSelectedValue: externalOnSelectedValue,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const isControlled = externalSelectedValue !== undefined;
  const value = isControlled ? externalSelectedValue : selectedValue;

  const handleSelect: Dispatch<SetStateAction<string | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const newValue =
          typeof nextValue === "function" ? nextValue(externalSelectedValue) : nextValue;
        if (newValue !== externalSelectedValue) {
          externalOnSelectedValue?.(newValue as string);
        }
      } else {
        setSelectedValue((prev) => {
          const newValue = typeof nextValue === "function" ? nextValue(prev) : nextValue;
          externalOnSelectedValue?.(newValue as string);

          return newValue;
        });
      }
    },
    [isControlled, externalSelectedValue, externalOnSelectedValue],
  );

  return (
    <SelectContext.Provider
      value={{ open, setOpen, selectedValue: value, setSelectedValue: handleSelect }}
    >
      <div className="h-fit w-fit" {...props}>
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
