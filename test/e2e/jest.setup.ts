import knex from 'knex';
import knexfile from '../../knexfile';

const database = knex(knexfile.test);

afterEach(async () => {
  await database('exams').truncate();
  await database('laboratories').truncate();
  await database('associations').truncate();
});
