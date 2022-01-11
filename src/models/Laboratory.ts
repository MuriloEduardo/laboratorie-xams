import Mysql from '../util/mysql';

export default class Laboratory {
  constructor(protected mysql = new Mysql()) {
    this.mysql.tableName = 'laboratory';
  }

  find() {
    return this.mysql.db.select();
  }
}
