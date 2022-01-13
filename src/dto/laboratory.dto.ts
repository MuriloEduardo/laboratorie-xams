export enum LaboratoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ILaboratoryDTO {
  id: string;
  name: string;
  address: string;
  status: LaboratoryStatus;
  deleted_at: Date | null;
}

export interface IUpdateBatchLaboratoryDTO {
  filters: Partial<ILaboratoryDTO>;
  values: Partial<ILaboratoryDTO>;
}
