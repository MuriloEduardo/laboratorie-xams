import Laboratory from '../models/Laboratory';
import { ILaboratoryDTO } from '../dto/laboratory.dto';

export default class LaboratoryService {
  constructor(protected laboratory = new Laboratory()) {}

  find() {
    return this.laboratory.find();
  }

  create(laboratoryDTO: ILaboratoryDTO): boolean {
    return !!this.laboratory.create(laboratoryDTO);
  }

  update(id: string, values: Partial<ILaboratoryDTO>) {
    return this.laboratory.update({ id }, values);
  }

  delete(id: string) {
    return this.laboratory.update(
      { id, deleted_at: null },
      { deleted_at: new Date() }
    );
  }
}
