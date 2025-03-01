import { MemberRecord } from "@/types/record";

export const mapLabelToKey = (label: string): keyof MemberRecord => {
  switch (label) {
    case "이름":
      return "name";
    case "주소":
      return "address";
    case "메모":
      return "memo";
    case "가입일":
      return "joinDate";
    case "직업":
      return "job";
    case "이메일 수신 동의":
      return "emailConsent";
    default:
      return "name";
  }
};
