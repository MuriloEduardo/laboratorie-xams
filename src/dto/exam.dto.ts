export enum ExamStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IExamDTO {
  id: string;
  name: string;
  address: string;
  status: ExamStatus;
  deleted_at: Date | null;
}
