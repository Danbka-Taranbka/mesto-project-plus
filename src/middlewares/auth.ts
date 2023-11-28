import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { someSecretStr } from "../config";
import AuthenticationError from "../errors/auth-err";

interface Jwt extends JwtPayload {
  _id: string;
}

export interface SessionRequest extends Request {
  user?: Jwt;
}

const extractBearerToken = (header: string | undefined) => {
  return header ? header.replace("Bearer ", "") : null;
};

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token || extractBearerToken(req.headers.authorization);
  let payload: Jwt | null = null;

  try {
    payload = jwt.verify(token, someSecretStr) as Jwt;
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthenticationError("Authentication Error!"));
  }
};
