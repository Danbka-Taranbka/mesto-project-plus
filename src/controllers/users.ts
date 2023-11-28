import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BadRequestError from "../errors/bad-request-err";
import AuthenticationError from "../errors/auth-err";
import User from '../models/user';
import NotFoundError from "../errors/not-found-error";
import { SUCCESS_STATUS } from "../utils/constants";
import { SessionRequest } from "../middlewares/auth";
import ValidationError from "../errors/validation-err";
import { someSecretStr } from "../config";

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(SUCCESS_STATUS).send(users))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(SUCCESS_STATUS).send(user))
    .catch(
      (err) => {
        if (err instanceof Error.ValidationError) {
          next(new ValidationError("Invalid data!"));
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

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, someSecretStr, {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true }).send({ token, user });
    })
    .catch(next);
};

export const getUserById = (id: string, res: Response, next: NextFunction) => {
  return User.findById(id)
    .orFail(() => { throw new NotFoundError("Not Found!"); })
    .then((user) => { res.status(SUCCESS_STATUS).send(user); })
    .catch(
      (err) => {
        if (err instanceof Error.CastError) {
          next(new BadRequestError("There is no user with such id!"));
        } else {
          next(err);
        }
      },
    );
};

export const getCurrentUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  getUserById(req.user!._id, res, next);
};

export const getUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  getUserById(req.params.id, res, next);
};

export const editUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  return User.findByIdAndUpdate(
    req.user!._id,
    req.body,
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
      } else {
        next(err);
      }
    });
};
