import knex from 'knex';
import { Chance } from 'chance';
import supertest from 'supertest';
import app from '../../../src/app';
import knexfile from '../../../knexfile';

const chance = new Chance();
const database = knex(knexfile.test);

describe('ExamController', () => {
  describe('index', () => {
    it('should return a list of active exams', async () => {
      const { status, body } = await supertest(app).get('/exams');

      expect(status).toBe(200);
      expect(body).toStrictEqual([]);
    });
  });

  describe('create', () => {
    it('should create a exam', async () => {
      const { status } = await supertest(app).post('/exams');

      expect(status).toBe(204);
    });
  });

  describe('update', () => {
    it('should update a exam', async () => {
      await database('exams').insert({
        name: chance.string(),
      });

      const [exam] = await database('exams');

      const id = exam.id;
      const name = chance.string();

      const { status } = await supertest(app)
        .patch(`/exams/${id}`)
        .send({ name });

      expect(status).toBe(204);
    });
  });

  describe('delete', () => {
    it('should logically remove a exam', async () => {
      await database('exams').insert({
        name: chance.string(),
      });

      const [exam] = await database('exams');

      const id = exam.id;

      const { status } = await supertest(app).delete(`/exams/${id}`);

      expect(status).toBe(204);
    });
  });
});
