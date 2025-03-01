import { DatePicker } from "antd";
import { ChangeEvent, useEffect, useRef } from "react";

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

export default function RecordForm({ onOpenChange, addRecord }: RecordFormProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const recordRef = useRef<MemberRecord>({
    name: "",
    address: "",
    memo: "",
    joinDate: "",
    job: "",
    emailConsent: false,
  });

  const updateSubmitButtonState = () => {
    const nameValue = recordRef.current.name;
    const joinDateValue = recordRef.current.joinDate;
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = !(nameValue && joinDateValue);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    recordRef.current.name = e.target.value;
    updateSubmitButtonState();
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    recordRef.current.address = e.target.value;
  };

  const handleMemoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    recordRef.current.memo = e.target.value;
  };

  const handleDateChange = (dateString: string) => {
    recordRef.current.joinDate = dateString;
    updateSubmitButtonState();
  };

  const handleJobChange = (value: JobType) => {
    recordRef.current.job = value;
  };

  const handleEmailConsentChange = (checked: boolean) => {
    recordRef.current.emailConsent = checked;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalData: MemberRecord = { ...recordRef.current };
    addRecord(finalData);
    onOpenChange(false);
  };

  useEffect(() => {
    updateSubmitButtonState();
  }, []);

  return (
    <Modal.Content ref={contentRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Modal.Header>회원 추가</Modal.Header>
        <div className="h-[36.5rem] w-full px-6">
          <div className="flex h-full w-full flex-col gap-5 pb-[1.438rem] pt-[0.625rem]">
            <FormField label="이름" required id="이름">
              <Input
                placeholder="이름 입력"
                id="이름"
                name="name"
                className="w-full"
                onChange={handleNameChange}
              />
            </FormField>
            <FormField label="주소" id="주소">
              <Input
                placeholder="주소 입력"
                id="주소"
                name="address"
                className="w-full"
                onChange={handleAddressChange}
              />
            </FormField>
            <FormField label="메모" id="메모" className="h-[6.5rem]">
              <Textarea
                placeholder="메모 입력"
                id="메모"
                name="memo"
                className="w-full"
                onChange={handleMemoChange}
              />
            </FormField>
            <FormField label="가입일" required id="가입일">
              <DatePicker
                onChange={(_, dateString) => handleDateChange(dateString as string)}
                getPopupContainer={() => contentRef.current || document.body}
              />
            </FormField>
            <FormField label="직업" id="직업">
              <Select onSelectedValue={(value: string) => handleJobChange(value as JobType)}>
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
            <FormField label="이메일 수신 동의" id="이메일 수신 동의" className="h-[3.875rem]">
              <Checkbox onChangeChecked={handleEmailConsentChange} />
            </FormField>
          </div>
        </div>
        <Modal.Footer>
          <Button
            type="button"
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
