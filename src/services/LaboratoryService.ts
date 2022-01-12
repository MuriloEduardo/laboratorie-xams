import { ILaboratoryDTO } from '../dto/laboratory.dto';
import Database from '../util/database';

export default class LaboratoryService {
  constructor(protected database = new Database()) {
    this.database.tableName = 'laboratories';
  }

  find(filters?: Partial<ILaboratoryDTO>) {
    return this.database.db.select().where({
      ...filters,
      deleted_at: null,
    });
  }

  create(laboratoryDTO: ILaboratoryDTO) {
    return this.database.db.insert(laboratoryDTO);
  }

  update(id: string, { name, address }: Partial<ILaboratoryDTO>) {
    return this.database.db.where({ id }).update({ name, address });
  }

  delete(id: string) {
    return this.database.db.where({ id }).update({ deleted_at: new Date() });
  }
}
