import Database from '../util/database';
import { ILaboratoryDTO } from '../dto/laboratory.dto';

export default class Laboratory {
  constructor(protected database = new Database()) {
    this.database.tableName = 'laboratories';
  }

  find() {
    return this.database.db.select();
  }

  create(laboratory: ILaboratoryDTO) {
    return this.database.db.insert(laboratory);
  }

  update(filters: Partial<ILaboratoryDTO>, values: Partial<ILaboratoryDTO>) {
    return this.database.db.where(filters).update(values);
  }
}
