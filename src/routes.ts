import { Router } from 'express';
import LaboratoryController from './controllers/LaboratoryController';

const routes = Router();

routes.get('/laboratories', LaboratoryController.index);
routes.get('/laboratories/create', LaboratoryController.create);

export default routes;
