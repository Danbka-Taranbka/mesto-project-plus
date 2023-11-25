import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import BadRequestError from "../errors/bad-request-err";
import AuthenticationError from "../errors/auth-err";
import User from '../models/user';
import NotFoundError from "../errors/not-found-error";

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new NotFoundError("There is no user with such id!");
      res.status(200).send(user);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(
      (err) => {
        if (err instanceof Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000) {
          next(
            new AuthenticationError("User with such email already exists!"),
          );
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
    .then((user) => {
      if (!user) throw new NotFoundError("There is no user with such id!");
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.message));
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
    .then((user) => {
      if (!user) throw new NotFoundError("There is no user with such id!");
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
