import { Chance } from 'chance';
import supertest from 'supertest';
import app from '../../../src/app';

const chance = new Chance();

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
      const id = chance.integer();
      const name = chance.string();

      const { status } = await supertest(app)
        .patch(`/laboratories/${id}`)
        .send({ name });

      expect(status).toBe(204);
    });
  });

  describe('delete', () => {
    it('should logically remove a laboratory', async () => {
      const id = chance.integer();

      const { status } = await supertest(app).delete(`/laboratories/${id}`);

      expect(status).toBe(204);
    });
  });
});
