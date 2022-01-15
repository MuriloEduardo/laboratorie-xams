import knex from 'knex';
import { Chance } from 'chance';
import supertest from 'supertest';
import app from '../../../src/app';
import knexfile from '../../../knexfile';

const chance = new Chance();
const database = knex(knexfile.test);

describe('AssociationController', () => {
  describe('create', () => {
    it('should associate active exam with an active lab', async () => {
      const [laboratory_id] = await database('laboratories').insert({
        name: chance.string(),
      });

      const [exam_id] = await database('exams').insert({
        name: chance.string(),
      });

      const { status } = await supertest(app)
        .post(`/associations/${laboratory_id}`)
        .send({
          exam_id,
        });

      expect(status).toBe(204);
    });
  });

  describe('remove', () => {
    it('should disassociate active exam with an active lab', async () => {
      const [laboratory_id] = await database('laboratories').insert({
        name: chance.string(),
      });

      const [exam_id] = await database('exams').insert({
        name: chance.string(),
      });

      await database('associations').insert({
        exam_id,
        laboratory_id,
      });

      const { status } = await supertest(app)
        .delete(`/associations/${laboratory_id}`)
        .send({
          exam_id,
        });

      expect(status).toBe(204);
    });
  });
});
