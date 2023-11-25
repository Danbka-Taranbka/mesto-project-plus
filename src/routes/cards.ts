import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  putLike,
  removeLike,
} from '../controllers/cards';
import { validateCard, validateObjectId } from '../middlewares/validators';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCard, createCard);

cardsRouter.delete('/:id', validateObjectId, deleteCard);
cardsRouter.delete('/:id/likes', validateObjectId, removeLike);
cardsRouter.put('/:id/likes', validateObjectId, putLike);

export default cardsRouter;
