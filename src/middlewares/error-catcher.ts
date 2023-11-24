import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request-err";
import AuthenticationError from "../errors/auth-err";

const errorCatcher = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number;
  let message: string;

  if (err instanceof Error.CastError) {
    statusCode = 404;
    message = "Incorrect id!";
  } else if (err instanceof Error.ValidationError) {
    statusCode = 400;
    message = "Validation error!";
  } else if (err.code === 11000) {
    statusCode = 401;
    message = "User with such email already exists!";
  } else if (err instanceof Error.DocumentNotFoundError) {
    statusCode = 404;
    message = "Not Found!";
  } else {
    statusCode = 500;
    message = "Server Error!";
  }

  res.status(statusCode).send({ message });
  next();
};

export default errorCatcher;
