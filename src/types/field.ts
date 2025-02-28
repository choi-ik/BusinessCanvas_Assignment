export interface BaseField {
  label: string;
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
