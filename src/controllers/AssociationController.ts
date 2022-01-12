import { NextFunction, Request, Response, Router } from 'express';
import AssociationService from '../services/AssociationService';
import ExamService from '../services/ExamService';
import LaboratoryService from '../services/LaboratoryService';

export default class AssociationController {
  constructor(
    protected examService = new ExamService(),
    protected laboratoryService = new LaboratoryService(),
    protected associationService = new AssociationService()
  ) {}

  register(router: Router) {
    router
      .route('/associations/:laboratory_id')
      .post(this.create.bind(this))
      .delete(this.remove.bind(this));
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { laboratory_id },
        body: { exam_id },
      } = req;

      const [laboratory] = await this.laboratoryService.find({
        id: laboratory_id,
      });

      if (!laboratory) {
        return res.status(404).send('Laboratory not found');
      }

      const [exam] = await this.examService.find({
        id: exam_id,
      });

      if (!exam) {
        return res.status(404).send('Exam not found');
      }

      const [association] = await this.associationService.find({
        exam_id,
        laboratory_id,
      });

      if (association) {
        return res.status(409).send('Association already exists');
      }

      await this.associationService.create({
        exam_id,
        laboratory_id,
      });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { laboratory_id },
        body: { exam_id },
      } = req;

      const association = await this.associationService.delete({
        exam_id,
        laboratory_id,
      });

      if (!association) {
        return res.status(404).send();
      }

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
