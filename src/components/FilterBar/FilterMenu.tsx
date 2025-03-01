import { MemberRecord } from "@/types/record";
import { mapLabelToKey } from "@/utils/fieldMapping";

import FilterItem from "./FilterItem";

interface FilterMenuProp {
  fieldName: string;
  records: MemberRecord[] | null;
  open: boolean;
  selectedValues: string[];
  onChangeToggle: (value: string) => void;
}

export default function FilterMenu({
  open,
  fieldName,
  records,
  selectedValues,
  onChangeToggle,
}: FilterMenuProp) {
  if (!records || !open) return null;

  const getFields = (name: string) => {
    const key = mapLabelToKey(name);
    const result = records.map((record) => record[key]);
    const uniqueResult = Array.from(new Set(result)).filter(
      (item) => typeof item === "string",
    ) as string[];

    return uniqueResult;
  };

  return (
    <div className="absolute top-full mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-[0.625rem] bg-white p-2 shadow-[0px_9px_28px_8px_#0000000D,0px_3px_6px_-4px_#0000001F,0px_6px_16px_0px_#00000014]">
      {fieldName === "이메일 수신 동의" ? (
        <>
          <FilterItem
            label="동의"
            checked={selectedValues.includes("동의")}
            onChangeFilter={() => onChangeToggle("동의")}
          />
          <FilterItem
            label="비동의"
            checked={selectedValues.includes("비동의")}
            onChangeFilter={() => onChangeToggle("비동의")}
          />
        </>
      ) : (
        getFields(fieldName).map((field, index) => (
          <FilterItem
            label={field}
            key={`${field}-${index}`}
            checked={selectedValues.includes(field)}
            onChangeFilter={() => onChangeToggle(field)}
          />
        ))
      )}
    </div>
  );
}
