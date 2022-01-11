import Laboratory from '../models/Laboratory';
import { ILaboratoryDTO } from '../dto/laboratory.dto';

export default class LaboratoryService {
  constructor(protected laboratory = new Laboratory()) {}

  find() {
    return this.laboratory.find();
  }

  create(laboratoryDTO: ILaboratoryDTO): boolean {
    const inserted = !!this.laboratory.create(laboratoryDTO);
    return inserted;
  }
}
