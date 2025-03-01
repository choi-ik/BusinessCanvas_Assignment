import { useState, useEffect } from "react";

import { RECORD_HEAD } from "@/constants/record";
import { MemberRecord } from "@/types/record";
import { Icon } from "@/ui/Icon";
import { cn } from "@/utils/tailwind";

import FilterMenu from "./FilterMenu";

interface FilterBarProps {
  records: MemberRecord[] | null;
  setRecords: (records: MemberRecord[]) => void;
}

/** 테이블 상단에서 필터링을 위한 필터 바 컴포넌트 */
export default function FilterBar({ records, setRecords }: FilterBarProps) {
  // 필터 선택된 값 상태
  const [filterSelections, setFilterSelections] = useState<{ [field: string]: string[] }>({});

  // 현재 열려 있는 필터 메뉴의 인덱스
  const [openFieldIndex, setOpenFieldIndex] = useState<number | null>(null);

  /**
   * 필터 선택 토글
   * 기존 선택된 값이 있으면 제거, 없으면 추가
   */
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

  // 선택된 필터를 기반으로 데이터 필터링
  const applyFilters = () => {
    if (!records) return;

    // 필터가 하나도 없으면 전체 데이터 반환
    const activeFilters = Object.entries(filterSelections).filter(
      ([, values]) => values.length > 0,
    );

    if (activeFilters.length === 0) {
      setRecords(records);

      return;
    }

    let unionFiltered: MemberRecord[] = [];

    // 각 필드별 필터링 적용
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

    // 중복 제거 후 최종 데이터 저장
    const deduped = Array.from(
      new Map(unionFiltered.map((record) => [record.name, record])).values(),
    );

    setRecords(deduped);
  };

  // 필터 상태 변경 시 필터링 적용
  useEffect(() => {
    applyFilters();
  }, [filterSelections]);

  return (
    <tr className="flex h-[2.375rem] w-[81.063rem] border-y border-black/[.06] bg-black/[.06]">
      <td className="flex h-full w-8 items-center justify-center">{/* 체크박스 자리 */}</td>
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
