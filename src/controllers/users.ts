import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import User from '../models/user';
import NotFoundError from "../errors/not-found-error";
import AuthenticationError from "../errors/auth-err";
import BadRequestError from "../errors/bad-request-err";

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError("There is no user with such id!");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
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
    .orFail(() => {
      throw new NotFoundError("There is no user with such id!");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
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
    .orFail(() => {
      throw new NotFoundError("There is no user with such id!");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};
