import { useState, useEffect } from "react";

import { RECORD_HEAD } from "@/constants/record";
import { MEMBER_KEY } from "@/constants/storageKey";
import { MemberRecord } from "@/types/record";
import { Icon } from "@/ui/Icon";
import { createArrayStorage } from "@/utils/arrayStorage";
import { cn } from "@/utils/tailwind";

import FilterMenu from "./FilterMenu";

interface FilterBarProps {
  setRecords: (records: MemberRecord[]) => void;
}

export default function FilterBar({ setRecords }: FilterBarProps) {
  const records = createArrayStorage<MemberRecord>(MEMBER_KEY).getValue();

  const [filterSelections, setFilterSelections] = useState<{ [field: string]: string[] }>({});

  const [openFieldIndex, setOpenFieldIndex] = useState<number | null>(null);

  const handleFilterToggle = (field: string, value: string) => {
    setFilterSelections((prev) => {
      const prevSelected = prev[field] || [];
      let newSelected: string[];
      if (prevSelected.includes(value)) {
        newSelected = prevSelected.filter((v) => v !== value);
      } else {
        newSelected = [...prevSelected, value];
      }

      return { ...prev, [field]: newSelected };
    });
  };

  const applyFilters = () => {
    if (!records) return;

    const activeFilters = Object.entries(filterSelections).filter(
      ([, values]) => values.length > 0,
    );

    if (activeFilters.length === 0) {
      setRecords(records);

      return;
    }

    let unionFiltered: MemberRecord[] = [];

    activeFilters.forEach(([field, values]) => {
      let filteredForField: MemberRecord[] = [];
      if (field === "이름") {
        filteredForField = records.filter((record) =>
          values.some((val) => record.name.includes(val)),
        );
      } else if (field === "주소") {
        filteredForField = records.filter((record) =>
          values.some((val) => record.address.includes(val)),
        );
      } else if (field === "메모") {
        filteredForField = records.filter((record) =>
          values.some((val) => record.memo.includes(val)),
        );
      } else if (field === "가입일") {
        filteredForField = records.filter((record) => values.includes(record.joinDate));
      } else if (field === "직업") {
        filteredForField = records.filter((record) => values.includes(record.job));
      } else if (field === "이메일 수신 동의") {
        filteredForField = records.filter((record) =>
          values.includes(record.emailConsent ? "동의" : "비동의"),
        );
      }
      unionFiltered = unionFiltered.concat(filteredForField);
    });

    const deduped = Array.from(
      new Map(unionFiltered.map((record) => [record.name, record])).values(),
    );

    setRecords(deduped);
  };

  useEffect(() => {
    applyFilters();
  }, [filterSelections]);

  return (
    <tr className="flex h-[2.375rem] w-[81.063rem] border-y border-black/[.06] bg-black/[.06]">
      <td className="flex h-full w-8 items-center justify-center">{/* 여기에 체크박스 등 */}</td>
      {RECORD_HEAD.map(({ name, size }, index) => (
        <th
          key={name}
          className={cn(
            "relative flex cursor-pointer items-center py-2 text-sm font-semibold",
            size,
          )}
          onClick={() => setOpenFieldIndex((prev) => (prev === index ? null : index))}
        >
          <div
            className={cn(
              "flex h-[1.375rem] w-full items-center justify-between border-r border-black/[.06] px-2",
            )}
          >
            <div>{name}</div>
            <Icon name="Filter" size={12} fill="#000000" className="text-black/25 opacity-25" />
          </div>
          <FilterMenu
            open={openFieldIndex === index}
            fieldName={name}
            records={records}
            selectedValues={filterSelections[name] || []}
            onChangeToggle={(value: string) => handleFilterToggle(name, value)}
          />
        </th>
      ))}
    </tr>
  );
}
