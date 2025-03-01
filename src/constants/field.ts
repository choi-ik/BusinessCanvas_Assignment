import { FieldTypes } from "@/types/field";

export const fieldMap: Record<string, FieldTypes> = {
  이름: "text",
  주소: "text",
  메모: "textarea",
  가입일: "date",
  직업: "select",
  "이메일 수신 동의": "checkbox",
};
