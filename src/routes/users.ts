import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});