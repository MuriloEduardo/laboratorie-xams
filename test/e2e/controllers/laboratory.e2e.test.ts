import knex from 'knex';
import { Chance } from 'chance';
import supertest from 'supertest';
import app from '../../../src/app';
import knexfile from '../../../knexfile';

const chance = new Chance();
const database = knex(knexfile.test);

describe('LaboratoryController', () => {
  describe('index', () => {
    it('should return a list of active labs', async () => {
      const { status, body } = await supertest(app).get('/laboratories');

      expect(status).toBe(200);
      expect(body).toStrictEqual([]);
    });
  });

  describe('create', () => {
    it('should create a laboratory', async () => {
      const { status } = await supertest(app).post('/laboratories');

      expect(status).toBe(204);
    });
  });

  describe('update', () => {
    it('should update a laboratory', async () => {
      const [id] = await database('laboratories').insert({
        name: chance.string(),
      });

      const name = chance.string();

      const { status } = await supertest(app)
        .patch(`/laboratories/${id}`)
        .send({ name });

      expect(status).toBe(204);
    });
  });

  describe('delete', () => {
    it('should logically remove a laboratory', async () => {
      const [id] = await database('laboratories').insert({
        name: chance.string(),
      });

      const { status } = await supertest(app).delete(`/laboratories/${id}`);

      expect(status).toBe(204);
    });
  });

  describe('search', () => {
    it('should find a list of laboratories associated with the researched exam', async () => {
      const exam_name = chance.string();
      const laboratory_name = chance.string();
      const laboratory_address = chance.string();

      const [laboratory_id] = await database('laboratories').insert({
        name: laboratory_name,
        address: laboratory_address,
      });

      const [exam_id] = await database('exams').insert({
        name: exam_name,
      });

      await database('associations').insert({
        exam_id,
        laboratory_id,
      });

      const { status, body } = await supertest(app)
        .get('/laboratories/search')
        .query({ exam_name });

      expect(status).toBe(200);
      expect(body).toMatchObject([
        {
          id: laboratory_id,
          name: laboratory_name,
          address: laboratory_address,
        },
      ]);
    });
  });
});
