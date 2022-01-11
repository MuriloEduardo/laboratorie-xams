import supertest from 'supertest';
import app from '../../../src/app';

describe('LaboratoryController', () => {
  it('should return a list of active labs', async () => {
    const { status, body } = await supertest(app).get('/laboratories');

    expect(status).toBe(200);
    expect(body).toStrictEqual([]);
  });
});
