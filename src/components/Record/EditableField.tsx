import { DatePicker } from "antd";
import dayjs from "dayjs";
import { MutableRefObject } from "react";

import { FieldDefinition } from "@/types/field";
import { Checkbox } from "@/ui/CheckBox";
import { Icon } from "@/ui/Icon";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Textarea } from "@/ui/Textarea";

interface EditableFieldProps<T> {
  field: FieldDefinition;
  recordRef: MutableRefObject<T>;
}

function EditableField<T>({ field, recordRef }: EditableFieldProps<T>) {
  const defaultValue = recordRef.current[field.key as keyof T];

  const handleChange = (newValue: string | boolean) => {
    recordRef.current[field.key as keyof T] = newValue as T[keyof T];
  };

  switch (field.type) {
    case "text":
      return (
        <Input
          defaultValue={defaultValue as string}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full"
        />
      );
    case "textarea":
      return (
        <Textarea
          defaultValue={defaultValue as string}
          onChange={(e) => handleChange(e.target.value)}
          className="h-full w-full"
        />
      );
    case "date":
      return (
        <DatePicker
          defaultValue={defaultValue ? dayjs(defaultValue as string) : undefined}
          onChange={(_, dateString) => handleChange(dateString as string)}
        />
      );
    case "select":
      return (
        <Select onSelectedValue={(val: string) => handleChange(val)}>
          <Select.Trigger>
            <span>{defaultValue as string}</span>
            <Icon name="ChevronDown" size={16} />
          </Select.Trigger>
          <Select.Content className="bg-white">
            {field.options?.map((opt) => (
              <Select.Item key={opt} value={opt}>
                {opt}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      );
    case "checkbox":
      return (
        <Checkbox
          checked={defaultValue as boolean}
          onChangeChecked={(checked) => handleChange(checked)}
        />
      );
    default:
      return <div>{defaultValue as string}</div>;
  }
}

export default EditableField;
