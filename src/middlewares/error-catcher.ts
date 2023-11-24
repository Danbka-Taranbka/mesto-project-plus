import { NextFunction, Request, Response } from 'express';

const errorCatcher = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server Error!' : message,
  });
  next();
};

export default errorCatcher;
