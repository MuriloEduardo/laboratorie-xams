import { Request, Response, Router } from 'express';
import LaboratoryService from '../services/LaboratoryService';

export default class LaboratoryController {
  constructor(protected laboratoryService = new LaboratoryService()) {}

  register(router: Router) {
    router
      .route('/laboratories')
      .get(this.index.bind(this))
      .post(this.create.bind(this));
  }

  async index(req: Request, res: Response) {
    const laboratories = await this.laboratoryService.find();

    return res.json(laboratories);
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    const laboratory = await this.laboratoryService.create(body);

    return res.json(laboratory);
  }
}
