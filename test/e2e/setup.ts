import knex from 'knex';
import knexfile from '../../knexfile';

const database = knex(knexfile.test);

beforeAll(() => {
  database('exams').truncate();
  database('associations').truncate();
  database('laboratories').truncate();
});

afterAll(() => {
  database('exams').truncate();
  database('associations').truncate();
  database('laboratories').truncate();
});
