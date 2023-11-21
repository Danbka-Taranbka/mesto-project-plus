import { Request, Response } from "express";
import Card from "../models/card";

/*const createCardd = (req: Request, res: Response) => {
  console.log(req.user._id);
};*/

export const getCards = (_req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.status(200).send({data: cards}))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};

export const createCard = (req: Request, res: Response) => {
  const {name, link, owner} = req.body;

  return Card.create({name, link, owner})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};

export const deleteCard = (req: Request, res: Response) => {
  return Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: "Server Error!"}));
};