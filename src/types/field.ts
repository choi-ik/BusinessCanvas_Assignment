import { MemberRecord } from "./record";

export interface BaseField {
  label: string;
  key: keyof MemberRecord;
  required?: boolean;
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

export interface NonSelectField extends BaseField {
  type: "text" | "textarea" | "date" | "checkbox";
}

export type FieldDefinition = SelectField | NonSelectField;
export type FieldTypes = "text" | "textarea" | "date" | "select" | "checkbox";
