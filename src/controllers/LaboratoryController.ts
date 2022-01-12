import { Request, Response, Router } from 'express';
import LaboratoryService from '../services/LaboratoryService';

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

  async index(req: Request, res: Response) {
    const laboratories = await this.laboratoryService.find();

    return res.json(laboratories);
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    await this.laboratoryService.create(body);

    return res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const {
      params: { id },
    } = req;
    const { body } = req;

    await this.laboratoryService.update(id, body);

    return res.status(204).send();
  }

  async remove(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    await this.laboratoryService.delete(id);

    return res.status(204).send();
  }
}
