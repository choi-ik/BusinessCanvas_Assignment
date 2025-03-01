import { DatePicker } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";

import { JobType, MemberRecord } from "@/types/record";
import { UseArrayStorageReturn } from "@/types/storage";
import { Button } from "@/ui/Button";
import { Checkbox } from "@/ui/CheckBox";
import { Icon } from "@/ui/Icon";
import { Input } from "@/ui/Input";
import { Modal } from "@/ui/Modal";
import { Select } from "@/ui/Select";
import { Textarea } from "@/ui/Textarea";

import FormField from "./FormFiled";

interface RecordFormProps {
  onOpenChange: (isOpen: boolean) => void;
  addRecord: UseArrayStorageReturn<MemberRecord>["add"];
}

/** 회원 추가를 위한 입력 폼 모달 컴포넌트 */
export default function RecordForm({ onOpenChange, addRecord }: RecordFormProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // 회원 정보를 저장하는 Ref
  const recordRef = useRef<MemberRecord>({
    name: "",
    address: "",
    memo: "",
    joinDate: "",
    job: "",
    emailConsent: false,
  });

  // 정보를 ref에 저장하는 범용 핸들러: field는 MemberRecord의 키, value는 string 또는 boolean
  const handleFieldChange = <K extends keyof MemberRecord>(field: K, value: MemberRecord[K]) => {
    recordRef.current[field] = value;

    if (field === "name" || field === "joinDate") {
      updateSubmitButtonState();
    }
  };

  // 제출 버튼 활성화 상태 업데이트 함수
  const updateSubmitButtonState = () => {
    const { name, joinDate } = recordRef.current;
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = !(name && joinDate);
    }
  };

  // 폼 제출 핸들러 - 입력된 데이터를 저장하고 모달 닫기
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData: MemberRecord = { ...recordRef.current };
    addRecord(finalData);
    onOpenChange(false);
  };

  const handleClickCancel = () => {
    onOpenChange(false);
  };

  // 초기 제출 버튼 상태 업데이트
  useEffect(() => {
    updateSubmitButtonState();
  }, []);

  return (
    <Modal.Content ref={contentRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Modal.Header>회원 추가</Modal.Header>
        <div className="h-[36.5rem] w-full px-6">
          <div className="flex h-full w-full flex-col gap-5 pb-[1.438rem] pt-[0.625rem]">
            {/* 이름 필드 */}
            <FormField label="이름" required id="이름">
              <Input
                placeholder="이름 입력"
                id="이름"
                name="name"
                className="w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("name", e.target.value)
                }
              />
            </FormField>
            {/* 주소 필드 */}
            <FormField label="주소" id="주소">
              <Input
                placeholder="주소 입력"
                id="주소"
                name="address"
                className="w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("address", e.target.value)
                }
              />
            </FormField>
            {/* 메모 필드 */}
            <FormField label="메모" id="메모" className="h-[6.5rem]">
              <Textarea
                placeholder="메모 입력"
                id="메모"
                name="memo"
                className="w-full"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleFieldChange("memo", e.target.value)
                }
              />
            </FormField>
            {/* 가입일 필드 */}
            <FormField label="가입일" required id="가입일">
              <DatePicker
                onChange={(_, dateString) => handleFieldChange("joinDate", dateString as string)}
                getPopupContainer={() => contentRef.current || document.body}
              />
            </FormField>
            {/* 직업 필드 */}
            <FormField label="직업" id="직업">
              <Select onSelectedValue={(val: string) => handleFieldChange("job", val as JobType)}>
                <Select.Trigger>
                  <span>개발자</span>
                  <Icon name="ChevronDown" size={16} />
                </Select.Trigger>
                <Select.Content className="bg-white">
                  <Select.Item value="개발자">개발자</Select.Item>
                  <Select.Item value="PO">PO</Select.Item>
                  <Select.Item value="디자이너">디자이너</Select.Item>
                </Select.Content>
              </Select>
            </FormField>
            {/* 이메일 수신 동의 필드 */}
            <FormField label="이메일 수신 동의" id="이메일 수신 동의" className="h-[3.875rem]">
              <Checkbox onChangeChecked={(checked) => handleFieldChange("emailConsent", checked)} />
            </FormField>
          </div>
        </div>
        <Modal.Footer>
          <Button
            type="button"
            onClick={handleClickCancel}
            className="h-8 w-[3.563rem] border border-[#E3E3E3] bg-white text-sm text-black/65 hover:bg-white active:bg-white"
          >
            취소
          </Button>
          <Button type="submit" ref={submitButtonRef} className="h-8 w-[3.563rem] text-sm">
            추가
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Content>
  );
}
