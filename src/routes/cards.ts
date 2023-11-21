import { Router } from 'express';
import { createCard, deleteCard, getCards, putLike, removeLike } from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.delete('/:id', deleteCard);
cardsRouter.delete('/:id/likes', removeLike);

cardsRouter.post('/', createCard);

cardsRouter.put('/:id/likes', putLike);

export default cardsRouter;