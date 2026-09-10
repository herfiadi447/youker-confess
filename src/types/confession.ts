export type AnswerType = 'yes' | 'no';

export interface ConfessionResponse {
  id?: string;
  answer: AnswerType;
  message?: string | null;
  dodged_count?: number;
  answered_at?: string;
}

export interface AdminAuthPayload {
  pin: string;
}

export interface SubmitResponsePayload {
  answer: AnswerType;
  message?: string;
  dodged_count: number;
}
