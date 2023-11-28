import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-error";
import AuthenticationError from "../errors/auth-err";
import { SessionRequest } from "../middlewares/auth";
import { SUCCESS_STATUS } from "../utils/constants";
import ValidationError from "../errors/validation-err";
import BadRequestError from "../errors/bad-request-err";

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .populate("owner")
    .then((cards) => res.status(SUCCESS_STATUS).send(cards))
    .catch(next);
};

export const createCard = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return (await Card.create({ name, link, owner: req.user!._id }))
    .populate("owner")
    .then((card) => res.status(SUCCESS_STATUS).send(card))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Card.findById(id)
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((card) => {
      if (card.owner.toString() === req.user!._id) {
        return Card.deleteOne({ _id: id }).then(() => res.status(SUCCESS_STATUS).send({ message: "Post is deleted!" }));
      }
      throw new AuthenticationError("You can delete only your cards!");
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else {
        next(err);
      }
    });
};

export const putLike = (req: SessionRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user!._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .populate("likes")
    .populate("owner")
    .then((card) => { res.status(SUCCESS_STATUS).send(card); })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else {
        next(err);
      }
    });
};

export const removeLike = (req: SessionRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user!._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .populate("likes")
    .populate("owner")
    .then((card) => { res.status(SUCCESS_STATUS).send(card); })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else {
        next(err);
      }
    });
};
