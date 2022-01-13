export enum ExamType {
  IMAGE = 'IMAGE',
  CLINICAL_ANALYSIS = 'CLINICAL_ANALYSIS',
}

export enum ExamStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IExamDTO {
  id: string;
  name: string;
  type: ExamType;
  status: ExamStatus;
  deleted_at: Date | null;
}

export interface IUpdateCollectionExamDTO {
  id: string;
  values: {
    name: string;
    type: ExamType;
    status: ExamStatus;
  };
}
