import { Router } from 'express';
import { createCard, deleteCard, getCards } from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.post('/', createCard);

export default cardsRouter;