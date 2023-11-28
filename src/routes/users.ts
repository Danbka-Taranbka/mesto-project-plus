import { Router } from 'express';
import {
  getUsers,
  getCurrentUser,
  getUser,
  editUser,
} from '../controllers/users';
import { validateAvatar, validateObjectId, validateUserData } from '../middlewares/validators';

const usersRouter = Router();

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserData, editUser);
usersRouter.patch('/me/avatar', validateAvatar, editUser);

usersRouter.get('/', getUsers);
usersRouter.get('/:id', validateObjectId, getUser);

export default usersRouter;
