export type PrivacyRequestType =
  | "EXPORT"
  | "DELETE"
  | "CORRECT";

export type PrivacyRequestRow = {
  id: string;
  customer_id: string | null;
  request_type: PrivacyRequestType;
  status:
    | "REQUESTED"
    | "IN_REVIEW"
    | "COMPLETED"
    | "REJECTED";
  request_note: string | null;
  resolution_note: string | null;
  requested_at: string;
  resolved_at: string | null;
};
