import { env } from './env';
import knex, { Knex } from 'knex';
import knexfile from '../../knexfile';

export default class Database {
  private config;
  private _db!: Knex;
  private _tbName!: string;

  constructor() {
    if (env.nodeEnv === 'test') {
      this.config = knexfile.test;
    } else if (env.nodeEnv === 'production') {
      this.config = knexfile.production;
    } else {
      this.config = knexfile.production;
    }

    this._db = this._db || knex(this.config);
  }

  get db() {
    return this._db(this._tbName);
  }

  set tableName(name: string) {
    this._tbName = name;
  }

  transaction() {
    return this._db.transaction();
  }
}
