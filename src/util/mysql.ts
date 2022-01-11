import knex, { Knex } from 'knex';
import { env } from './env';

export default class Mysql {
  protected _db!: Knex;
  private _tbName!: string;

  constructor() {
    this._db =
      this._db ||
      knex({
        client: 'mysql2',
        debug: env.mysqlDebug || false,
        connection: {
          host: env.mysqlHost,
          port: env.mysqlPort,
          user: env.mysqlUser,
          password: env.mysqlPassword,
          database: env.mysqlSchema,
        },
      });
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
