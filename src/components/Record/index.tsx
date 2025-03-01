import { useState, useRef } from "react";

import { fieldMap } from "@/constants/field";
import { RECORD_HEAD } from "@/constants/record";
import { FieldDefinition } from "@/types/field";
import { MemberRecord } from "@/types/record";
import { UseArrayStorageReturn } from "@/types/storage";
import { Checkbox } from "@/ui/CheckBox";
import { mapLabelToKey } from "@/utils/fieldMapping";
import { cn } from "@/utils/tailwind";

import EditableField from "./EditableField";
import RecordMenu from "./RecordMenu";

interface RecordProps extends MemberRecord {
  removeRecord: UseArrayStorageReturn<MemberRecord>["remove"];
  updateRecord: UseArrayStorageReturn<MemberRecord>["updateItem"];
}

/** 개별 회원 정보를 표시하고 수정/삭제 기능을 제공하는 컴포넌트 */
export default function Record({
  name,
  address,
  memo,
  joinDate,
  job,
  emailConsent,
  removeRecord,
  updateRecord,
}: RecordProps) {
  // 현재 편집 모드 여부
  const [isEditing, setIsEditing] = useState(false);

  // 편집 중 변경된 데이터를 저장
  const editRecordRef = useRef<MemberRecord>({
    name,
    address,
    memo,
    joinDate,
    job,
    emailConsent,
  });

  // 수정 버튼 클릭 시 현재 데이터를 복사하여 편집 모드 활성화
  const handleEdit = () => {
    editRecordRef.current = { name, address, memo, joinDate, job, emailConsent };
    setIsEditing(true);
  };

  // 저장 버튼 클릭 시 변경된 데이터를 업데이트하고 편집 모드 종료
  const handleSave = () => {
    const finalData: MemberRecord = { ...editRecordRef.current };
    updateRecord(
      (record) => record.name === name,
      () => finalData,
    );
    setIsEditing(false);
  };

  // 삭제 버튼 클릭 시 해당 레코드 제거
  const handleDelete = () => {
    removeRecord((record) => record.name === name);
  };

  /**
   * 컬럼 이름을 기반으로 적절한 필드를 렌더링
   * - 편집 모드일 경우: 입력 가능한 `EditableField` 제공
   * - 기본 모드일 경우: 해당 값 표시
   */
  const renderField = (colName: string) => {
    let fieldDefinition: FieldDefinition;

    // 필드 타입 정의 (선택 필드와 일반 필드 구분)
    if (fieldMap[colName] === "select") {
      fieldDefinition = {
        label: colName,
        key: mapLabelToKey(colName),
        type: "select",
        required: colName === "이름" || colName === "가입일",
        options: ["개발자", "PO", "디자이너"],
      };
    } else {
      fieldDefinition = {
        label: colName,
        key: mapLabelToKey(colName),
        type: fieldMap[colName] || "text",
        required: colName === "이름" || colName === "가입일",
      };
    }

    if (!isEditing) {
      if (colName === "이메일 수신 동의") {
        return <Checkbox checked={emailConsent} />;
      }

      return <div className="break-words">{editRecordRef.current[fieldDefinition.key]}</div>;
    } else {
      return <EditableField<MemberRecord> field={fieldDefinition} recordRef={editRecordRef} />;
    }
  };

  return (
    <tr className="flex min-h-12 w-[81.063rem] items-center text-sm">
      <td className="flex min-h-full w-8 items-center justify-center border border-black/[.06]">
        <Checkbox />
      </td>
      {RECORD_HEAD.map(({ name: colName, size }) => (
        <td
          key={colName}
          className={cn("flex items-center justify-between border-black/[.06] px-2 py-2", size)}
        >
          <div className="h-full w-full">{renderField(colName)}</div>
        </td>
      ))}
      <td className="flex flex-1 items-center justify-center">
        {isEditing ? (
          <div className="flex gap-2">
            <button className="text-blue-500" onClick={handleSave}>
              저장
            </button>
          </div>
        ) : (
          <RecordMenu onClickEdit={handleEdit} onClickDelete={handleDelete} />
        )}
      </td>
    </tr>
  );
}
