import Chance from 'chance';
import supertest from 'supertest';
import app from '../../../src/app';

describe('AssociationController', () => {
  describe('create', () => {
    it('should associate active exam with an active lab', async () => {
      const laboratory_id = 1;
      const { status } = await supertest(app)
        .post(`/associations/${laboratory_id}`)
        .send({
          exam_id: 2,
        });

      expect(status).toBe(200);
    });
  });

  describe('remove', () => {
    it('should associate active exam with an active lab', async () => {
      const laboratory_id = 1;
      const { status } = await supertest(app)
        .delete(`/associations/${laboratory_id}`)
        .send({
          exam_id: 2,
        });

      expect(status).toBe(200);
    });
  });
});
