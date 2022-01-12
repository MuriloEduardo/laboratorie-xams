import { LaboratoryStatus } from '../dto/laboratory.dto';
import LaboratoryService from '../services/LaboratoryService';
import { NextFunction, Request, Response, Router } from 'express';

export default class LaboratoryController {
  constructor(protected laboratoryService = new LaboratoryService()) {}

  register(router: Router) {
    router
      .route('/laboratories')
      .get(this.index.bind(this))
      .post(this.create.bind(this));

    router
      .route('/laboratories/:id')
      .patch(this.update.bind(this))
      .delete(this.remove.bind(this));
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const laboratories = await this.laboratoryService.find({
        status: LaboratoryStatus.ACTIVE,
      });

      return res.json(laboratories);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      await this.laboratoryService.create(body);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      const [laboratory] = await this.laboratoryService.find({ id });

      if (!laboratory) {
        return res.status(404).send();
      }

      const updated = !!(await this.laboratoryService.update(id, body));

      if (!updated) {
        return res.status(500).send();
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;

      const [laboratory] = await this.laboratoryService.find({
        id,
        status: LaboratoryStatus.ACTIVE,
      });

      if (!laboratory) {
        return res.status(404).send();
      }

      const removed = !!(await this.laboratoryService.delete(id));

      if (!removed) {
        return res.status(500).send();
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
