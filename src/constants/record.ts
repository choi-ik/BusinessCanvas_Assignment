import { MemberRecord } from "@/types/record";

export const RECORD_HEAD = [
  {
    name: "이름",
    size: "w-[7.5rem]",
  },
  {
    name: "주소",
    size: "w-[15.563rem]",
  },
  {
    name: "메모",
    size: "w-[15.563rem]",
  },
  {
    name: "가입일",
    size: "w-[12.5rem]",
  },
  {
    name: "직업",
    size: "w-[15.563rem]",
  },
  {
    name: "이메일 수신 동의",
    size: "w-[9.375rem]",
  },
];

export const DEFAULT_RECORDS: MemberRecord[] = [
  {
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinDate: "2024-10-02",
    job: "개발자",
    emailConsent: true,
  },
  {
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    joinDate: "2024-10-01",
    job: "PO",
    emailConsent: false,
  },
];
