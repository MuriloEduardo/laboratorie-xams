import { Chance } from 'chance';
import ExamService from '../../../src/services/ExamService';

const chance = new Chance();

describe('ExamService', () => {
  describe('find', () => {
    it('exists', () => {
      const examService = new ExamService();
      expect(typeof examService.find).toBe('function');
    });

    it('should return the data obtained from the service', async () => {
      const finded = [
        {
          name: chance.string(),
          address: chance.string(),
          status: chance.string(),
        },
      ];

      const database = {
        db: {
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnValue(finded),
        },
      };

      // @ts-ignore
      const examService = new ExamService(database);

      const result = await examService.find();

      expect(result).toBe(finded);
    });
  });
});
