import { Chance } from 'chance';
import AssociationService from '../../../src/services/AssociationService';

const chance = new Chance();

describe('AssociationService', () => {
  describe('find', () => {
    it('exists', () => {
      const associationService = new AssociationService();
      expect(typeof associationService.find).toBe('function');
    });

    it('should return the data obtained from the service', async () => {
      const finded = [
        {
          exam_id: chance.integer(),
          laboratory_id: chance.integer(),
        },
      ];

      const database = {
        db: {
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnValue(finded),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      // @ts-ignore
      const result = await associationService.find();

      expect(result).toBe(finded);
    });

    it('should call the where method with an object containing the exam and laboratory id', async () => {
      const association = {
        exam_id: chance.string(),
        laboratory_id: chance.string(),
      };

      const database = {
        db: {
          where: jest.fn(),
          select: jest.fn().mockReturnThis(),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      await associationService.find(association);

      expect(database.db.where).toBeCalledWith(association);
    });
  });

  describe('create', () => {
    it('exists', () => {
      const associationService = new AssociationService();
      expect(typeof associationService.create).toBe('function');
    });

    it('should return the data obtained from the service', async () => {
      const created = [
        {
          exam_id: chance.integer(),
          laboratory_id: chance.integer(),
        },
      ];

      const database = {
        db: {
          insert: jest.fn().mockReturnValue(created),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      // @ts-ignore
      const result = await associationService.create();

      expect(result).toBe(created);
    });

    it('should call the where method with an object containing the exam and laboratory id', async () => {
      const association = {
        exam_id: chance.string(),
        laboratory_id: chance.string(),
      };

      const database = {
        db: {
          insert: jest.fn(),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      await associationService.create(association);

      expect(database.db.insert).toBeCalledWith(association);
    });
  });

  describe('delete', () => {
    it('exists', () => {
      const associationService = new AssociationService();
      expect(typeof associationService.delete).toBe('function');
    });

    it('should return the data obtained from the service', async () => {
      const deleted = true;

      const database = {
        db: {
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnValue(deleted),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      // @ts-ignore
      const result = await associationService.delete();

      expect(result).toBe(deleted);
    });

    it('should call the where method with an object containing the exam and laboratory id', async () => {
      const association = {
        exam_id: chance.string(),
        laboratory_id: chance.string(),
      };

      const database = {
        db: {
          where: jest.fn().mockReturnThis(),
          delete: jest.fn(),
        },
      };

      // @ts-ignore
      const associationService = new AssociationService(database);

      await associationService.delete(association);

      expect(database.db.where).toBeCalledWith(association);
    });
  });
});
