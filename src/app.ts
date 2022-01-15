import cors from 'cors';
import express, { Express } from 'express';
import ExamController from './controllers/ExamController';
import LaboratoryController from './controllers/LaboratoryController';
import AssociationController from './controllers/AssociationController';

class App {
  public express: Express;

  constructor() {
    this.express = express();

    this.express.use(cors());
    this.express.use(express.json());

    this.routes();
  }

  routes() {
    [
      new ExamController(),
      new LaboratoryController(),
      new AssociationController(),
    ].forEach((route) => {
      const router = express.Router();

      route.register(router);

      this.express.use(router);
    });
  }
}

export default new App().express;
