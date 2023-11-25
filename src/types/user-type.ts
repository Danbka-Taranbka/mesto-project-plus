import { Request } from 'express';

export interface IGetUserInfoRequest extends Request {
  user: {_id: string};
}
