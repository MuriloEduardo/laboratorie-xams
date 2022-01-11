import dotenv from 'dotenv';

dotenv.config();

const env = {
  mysqlPort: parseInt(process.env.MYSQL_PORT || '3306', 10),
  mysqlHost: process.env.MYSQL_HOST,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlSchema: process.env.MYSQL_SCHEMA,
  mysqlDebug: process.env.MYSQL_DEBUG === 'true',
};

export { env };
