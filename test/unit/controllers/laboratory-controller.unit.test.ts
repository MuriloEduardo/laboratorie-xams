import { Chance } from 'chance';
import LaboratoryController from '../../../src/controllers/LaboratoryController';

const chance = new Chance();

describe('LaboratoryController', () => {
  describe('index', () => {
    it('exists', () => {
      const laboratoryController = new LaboratoryController();
      expect(typeof laboratoryController.index).toBe('function');
    });

    it('should return the data obtained from the service', async () => {
      const findResult = [
        {
          name: chance.string(),
          address: chance.string(),
          status: chance.string(),
        },
      ];

      const laboratoryService = {
        find: jest.fn(),
      };

      const res = {
        json: jest.fn().mockReturnValue(findResult),
      };

      //@ts-ignore
      const laboratoryController = new LaboratoryController(laboratoryService);

      //@ts-ignore
      const result = await laboratoryController.index(null, res);

      expect(result).toBe(findResult);
    });
  });
});
