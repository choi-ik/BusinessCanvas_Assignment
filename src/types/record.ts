export type JobType = "개발자" | "PO" | "디자이너";

export interface MemberRecord {
  name: string;
  address: string;
  memo: string;
  joinDate: string;
  job: JobType | string;
  emailConsent: boolean;
}
