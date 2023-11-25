import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-error";
import AuthenticationError from "../errors/auth-err";
import { SessionRequest } from "../middlewares/auth";

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .populate("owner")
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return (await Card.create({ name, link, owner: req.user!._id }))
    .populate("owner")
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Card.findById(id)
    .orFail(() => {
      throw new NotFoundError("Карточка с указанным _id не найдена");
    })
    .then((card) => {
      if (card.owner.toString() === req.user!._id) {
        return Card.deleteOne({ _id: id }).then(() => res.status(200).send({ message: "Post is deleted!" }));
      }
      throw new AuthenticationError("You can delete only your cards!");
    })
    .catch(next);
};

export const putLike = (req: SessionRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user!._id } },
    { new: true },
  )
    .populate("likes")
    .populate("owner")
    .then((card) => {
      if (!card) throw new NotFoundError('There is no card with such _id!');
      res.status(200).send(card);
    })
    .catch(next);
};

export const removeLike = (req: SessionRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user!._id } },
    { new: true },
  )
    .populate("likes")
    .populate("owner")
    .then((card) => {
      if (!card) throw new NotFoundError('There is no card with such _id!');
      res.status(200).send(card);
    })
    .catch(next);
};
