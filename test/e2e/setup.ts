import knex from 'knex';
import knexfile from '../../knexfile';

const database = knex(knexfile.test);

beforeAll(() => {
  database('exams').truncate();
});

afterAll(() => {
  database('exams').truncate();
});
