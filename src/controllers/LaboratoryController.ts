import { IExamDTO } from '../dto/exam.dto';
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
      .route('/laboratories/:id?')
      .patch(this.update.bind(this))
      .delete(this.remove.bind(this));

    router.route('/laboratories/search').get(this.search.bind(this));
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
        body,
      } = req;

      const updated = await this.laboratoryService.update(body, id);

      if (!updated) {
        return res.status(404).send();
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
        body,
      } = req;

      const removed = await this.laboratoryService.delete(body, id);

      if (!removed) {
        return res.status(404).send();
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const {
      query: { exam_name },
    } = req;

    const exam = { name: exam_name } as Partial<IExamDTO>;

    try {
      const laboratories = await this.laboratoryService.searchByExam(exam);

      return res.json(laboratories);
    } catch (error) {
      next(error);
    }
  }
}
