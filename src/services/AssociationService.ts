import { IAssociationDTO } from '../dto/association.dto';
import Database from '../util/database';

export default class AssociationService {
  constructor(protected database = new Database()) {
    this.database.tableName = 'associations';
  }

  find(association: IAssociationDTO) {
    return this.database.db.select().where(association);
  }

  create(association: IAssociationDTO) {
    return this.database.db.insert(association);
  }

  delete(association: IAssociationDTO) {
    return this.database.db.where(association).delete();
  }
}
