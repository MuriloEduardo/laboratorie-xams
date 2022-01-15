import knex from 'knex';
import knexfile from '../../knexfile';

const database = knex(knexfile.test);

afterAll(async () => {
  await database('exams').truncate();
});
