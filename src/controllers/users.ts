import { NextFunction, Request, Response } from "express";
import User from '../models/user';

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .orFail(() => {
      throw res.status(404).send({message: 'There is no user with such _id!'});
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, about, avatar} = req.body;

  return User.create({name, about, avatar})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

export const editProfile = (req: Request, res: Response, next: NextFunction) => {
  return User.findByIdAndUpdate(req.body.user._id,
    {name: req.body.name, about: req.body.about},
    {new: true})
    .orFail(() => {
      throw res.status(404).send({message: 'There is no user with such _id!'});
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

export const editAvatar = (req: Request, res: Response, next: NextFunction) => {
  return User.findByIdAndUpdate(req.body.user._id,
    {avatar: req.body.avatar},
    {new: true})
    .orFail(() => {
      throw res.status(404).send({message: 'There is no user with such _id!'});
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};