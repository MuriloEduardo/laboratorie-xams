import Database from '../util/database';
import { ILaboratoryDTO } from '../dto/laboratory.dto';

export default class Laboratory {
  constructor(protected database = new Database()) {
    this.database.tableName = 'laboratories';
  }

  find(filters: Partial<ILaboratoryDTO>) {
    return this.database.db.select().where(filters);
  }

  create(laboratory: ILaboratoryDTO) {
    return this.database.db.insert(laboratory);
  }

  update(
    filters: Partial<ILaboratoryDTO>,
    { name, address, deleted_at }: Partial<ILaboratoryDTO>
  ) {
    return this.database.db
      .where(filters)
      .update({ name, address, deleted_at });
  }
}
