import { Router } from 'express';
import {
  getUsers,
  editProfile,
  editAvatar,
  getCurrentUser,
  getUser,
} from '../controllers/users';
import { validateAvatar, validateObjectId, validateUserData } from '../middlewares/validators';

const usersRouter = Router();

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserData, editProfile);
usersRouter.patch('/me/avatar', validateAvatar, editAvatar);

usersRouter.get('/', getUsers);
usersRouter.get('/:id', validateObjectId, getUser);

export default usersRouter;
