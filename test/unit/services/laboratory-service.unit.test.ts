import { Chance } from 'chance';
import LaboratoryService from '../../../src/services/LaboratoryService';

const chance = new Chance();

describe('LaboratoryService', () => {
  describe('find', () => {
    it('exists', () => {
      const laboratoryService = new LaboratoryService();
      expect(typeof laboratoryService.find).toBe('function');
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
      const laboratoryService = new LaboratoryService(database);

      const result = await laboratoryService.find();

      expect(result).toBe(finded);
    });
  });
});
