import { NextFunction, Request, Response } from "express";
import { SERVER_ERROR_STATUS } from "../utils/constants";

const errorCatcher = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = SERVER_ERROR_STATUS, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_STATUS
        ? "Server Error!"
        : message,
    });
  next();
};

export default errorCatcher;
