import knex, { Knex } from 'knex';
import knexfile from '../../knexfile';

export default class Database {
  protected _db!: Knex;
  private _tbName!: string;

  constructor() {
    this._db = this._db || knex(knexfile.development);
  }

  get db() {
    return this._db(this._tbName);
  }

  get knex() {
    return this._db;
  }

  set tableName(name: string) {
    this._tbName = name;
  }
}
