import { Request, Response } from "express";
import User from '../models/user';

export const getUsers = (_req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.status(200).send({data: users}))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};

export const getUserById = (req: Request, res: Response) => {
  return User.findById(req.params.id)
    .then((user) => res.status(200).send({data: user}))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};

export const createUser = (req: Request, res: Response) => {
  const {name, about, avatar} = req.body;

  return User.create({name, about, avatar})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};
