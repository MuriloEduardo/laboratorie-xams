import { env } from './src/util/env';

const defaultConnection = {
  client: 'mysql2',
  debug: env.mysqlDebug || false,
  connection: {
    host: env.mysqlHost,
    port: env.mysqlPort,
    user: env.mysqlUser,
    password: env.mysqlPassword,
    database: env.mysqlDatabase,
  },
};

export default {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test-db.sqlite',
    },
    useNullAsDefault: true,
  },
  development: defaultConnection,
  production: defaultConnection,
};
