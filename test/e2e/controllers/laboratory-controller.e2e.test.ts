import supertest from 'supertest';
import app from '../../../src/app';

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
});
