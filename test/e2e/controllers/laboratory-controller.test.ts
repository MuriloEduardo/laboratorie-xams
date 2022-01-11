import supertest from 'supertest';
import App from '../../../src/app';

describe('LaboratoryController', () => {
  it('should return a list of active labs', async () => {
    const { status, body } = await supertest(App).get('/laboratories');
    expect(status).toBe(200);
    expect(body).toBe([]);
  });
});
