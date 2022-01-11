import express, { Express } from 'express';
import LaboratoryController from './controllers/LaboratoryController';

class App {
  public express: Express;

  constructor() {
    this.express = express();

    this.express.use(express.json());

    this.routes();
  }

  routes() {
    [new LaboratoryController()].forEach((route) => {
      const router = express.Router();

      route.register(router);

      this.express.use(router);
    });
  }
}

export default new App().express;
