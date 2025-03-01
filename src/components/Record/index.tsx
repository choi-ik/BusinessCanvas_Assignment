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
  const [isEditing, setIsEditing] = useState(false);
  const editRecordRef = useRef<MemberRecord>({
    name,
    address,
    memo,
    joinDate,
    job,
    emailConsent,
  });

  const handleEdit = () => {
    editRecordRef.current = { name, address, memo, joinDate, job, emailConsent };
    setIsEditing(true);
  };

  const handleSave = () => {
    const finalData: MemberRecord = { ...editRecordRef.current };
    updateRecord(
      (record) => record.name === name,
      () => finalData,
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeRecord((record) => record.name === name);
  };

  const renderField = (colName: string) => {
    let fieldDefinition: FieldDefinition;
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

      return <div>{editRecordRef.current[fieldDefinition.key]}</div>;
    } else {
      return <EditableField<MemberRecord> field={fieldDefinition} recordRef={editRecordRef} />;
    }
  };

  return (
    <tr className="flex h-12 w-[81.063rem] items-center text-sm">
      <td className="flex h-full w-8 items-center justify-center border border-black/[.06]">
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
