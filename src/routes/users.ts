import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  editProfile,
  editAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);

usersRouter.post('/', createUser);

usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', editAvatar);

export default usersRouter;
