import { Request, Response } from 'express';
import EmailService from '../services/EmailService';

class UserController {
  static async index(req: Request, res: Response) {
    const users = [{ name: 'Murilo', email: 'murilo@gmail.com' }];
    return res.json(users);
  }

  static async create(req: Request, res: Response) {
    const emailService = new EmailService();

    await emailService.sendMail(
      {
        name: 'Maria Joaquina',
        email: 'maria@joaquina.com',
      },
      {
        subject: 'Bem-vinda Maria!!!',
        body: 'Que bom ver você aqui!',
      }
    );

    return res.json({ ok: true });
  }
}

export default UserController;
