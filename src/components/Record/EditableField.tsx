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

/** 다양한 입력 유형을 지원하는 편집 가능한 필드 컴포넌트 */
function EditableField<T>({ field, recordRef }: EditableFieldProps<T>) {
  // 현재 필드의 기본값 가져오기
  const defaultValue = recordRef.current[field.key as keyof T];

  // recordRef 값 업데이트
  const handleChange = (newValue: string | boolean) => {
    recordRef.current[field.key as keyof T] = newValue as T[keyof T];
  };

  // 필드 타입 별 조건부 렌더링
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
