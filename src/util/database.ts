import { env } from './env';
import knex, { Knex } from 'knex';
import knexfile from '../../knexfile';

export default class Database {
  private config =
    env.nodeEnv === 'test' ? knexfile.test : knexfile.development;
  private _db!: Knex;
  private _tbName!: string;

  constructor() {
    this._db = this._db || knex(this.config);
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
