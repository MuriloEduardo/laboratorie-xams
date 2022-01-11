import Database from '../util/database';

export default class Laboratory {
  constructor(protected database = new Database()) {
    this.database.tableName = 'laboratories';
  }

  find() {
    return this.database.db.select();
  }
}
