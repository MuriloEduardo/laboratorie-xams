import knex from 'knex';
import knexfile from '../../knexfile';

const database = knex(knexfile.test);

afterAll(() => {
  database('exams').truncate();
});
