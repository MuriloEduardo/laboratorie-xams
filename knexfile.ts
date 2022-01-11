import { env } from './src/util/env';

export default {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test-db.sqlite',
    },
    useNullAsDefault: true,
  },

  development: {
    client: 'mysql2',
    debug: env.mysqlDebug || false,
    connection: {
      host: env.mysqlHost,
      port: env.mysqlPort,
      user: env.mysqlUser,
      password: env.mysqlPassword,
      database: env.mysqlDatabase,
    },
  },
};
