import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-error";
import { SUCCESS_STATUS } from "../utils/constants";
import BadRequestError from "../errors/bad-request-err";
import ValidationError from "../errors/validation-err";

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .populate("owner")
    .then((cards) => res.status(SUCCESS_STATUS).send(cards))
    .catch(next);
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return (await Card.create({ name, link, owner: req.body.user._id }))
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

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndRemove(req.params.id)
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((card) => { res.status(SUCCESS_STATUS).send(card); })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError("Not Found!"));
      } else {
        next(err);
      }
    });
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .populate("likes")
    .populate("owner")
    .then((card) => { res.status(SUCCESS_STATUS).send(card); })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError("Not Found!"));
      } else {
        next(err);
      }
    });
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .populate("likes")
    .populate("owner")
    .then((card) => { res.status(SUCCESS_STATUS).send(card); })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no card with such id!"));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError("Not Found!"));
      } else {
        next(err);
      }
    });
};
