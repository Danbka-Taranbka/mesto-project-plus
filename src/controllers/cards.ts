import { NextFunction, Request, Response } from "express";
import Card from "../models/card";

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return (await Card.create({ name, link, owner: req.body.user._id }))
    .populate("owner")
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw res.status(404).send({ message: 'There is no card with such _id!' });
    })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw res.status(404).send({ message: 'There is no card with such _id!' });
    })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(next);
};
