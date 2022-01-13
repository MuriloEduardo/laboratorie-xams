import { ExamStatus } from '../dto/exam.dto';
import ExamService from '../services/ExamService';
import { NextFunction, Request, Response, Router } from 'express';

export default class ExamController {
  constructor(protected examService = new ExamService()) {}

  register(router: Router) {
    router
      .route('/exams')
      .get(this.index.bind(this))
      .post(this.create.bind(this));

    router
      .route('/exams/:id?')
      .patch(this.update.bind(this))
      .delete(this.remove.bind(this));
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const exams = await this.examService.find({
        status: ExamStatus.ACTIVE,
      });

      return res.json(exams);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      await this.examService.create(body);

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

      const collection = id ? [{ id, values: body }] : body;

      const updated = await this.examService.update(collection);

      if (!updated) {
        return res
          .status(404)
          .send('Some resources may not have been found, nothing has changed');
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

      const [exam] = await this.examService.find({
        id,
        status: ExamStatus.ACTIVE,
      });

      if (!exam) {
        return res.status(404).send();
      }

      const removed = !!(await this.examService.delete(id));

      if (!removed) {
        return res.status(500).send();
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
