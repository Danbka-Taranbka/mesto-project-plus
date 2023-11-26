import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import BadRequestError from "../errors/bad-request-err";
import User from '../models/user';
import NotFoundError from "../errors/not-found-error";
import { SUCCESS_STATUS } from "../utils/constants";
import ValidationError from "../errors/validation-err";

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(SUCCESS_STATUS).send(users))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((user) => { res.status(SUCCESS_STATUS).send(user); })
    .catch(
      (err) => {
        if (err instanceof Error.CastError) {
          next(new BadRequestError("There is no user with such id!"));
        } else if (err instanceof Error.DocumentNotFoundError) {
          next(new NotFoundError("Not Found!"));
        } else {
          next(err);
        }
      },
    );
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_STATUS).send(user))
    .catch(
      (err) => {
        if (err instanceof Error.ValidationError) {
          next(new ValidationError("Invalid data!"));
        } else {
          next(err);
        }
      },
    );
};

export const editProfile = (req: Request, res: Response, next: NextFunction) => {
  return User.findByIdAndUpdate(
    req.body.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((user) => { res.status(SUCCESS_STATUS).send(user); })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no user with such id!"));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError("Not Found!"));
      } else {
        next(err);
      }
    });
};

export const editAvatar = (req: Request, res: Response, next: NextFunction) => {
  return User.findByIdAndUpdate(
    req.body.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((user) => { res.status(SUCCESS_STATUS).send(user); })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new ValidationError("Invalid data!"));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError("There is no user with such id!"));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError("Not Found!"));
      } else {
        next(err);
      }
    });
};
