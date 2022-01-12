import Laboratory from '../models/Laboratory';
import { ILaboratoryDTO, LaboratoryStatus } from '../dto/laboratory.dto';

export default class LaboratoryService {
  constructor(protected laboratory = new Laboratory()) {}

  find(filters?: Partial<ILaboratoryDTO>) {
    return this.laboratory.find({
      ...filters,
      deleted_at: null,
    });
  }

  create(laboratoryDTO: ILaboratoryDTO) {
    return this.laboratory.create(laboratoryDTO);
  }

  update(id: string, { name, address }: Partial<ILaboratoryDTO>) {
    return this.laboratory.update({ id }, { name, address });
  }

  delete(id: string) {
    return this.laboratory.update({ id }, { deleted_at: new Date() });
  }
}
