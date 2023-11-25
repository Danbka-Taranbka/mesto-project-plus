import { BAD_REQUEST_STATUS } from "../utils/constants";

class BadRequestError extends Error {
  statusCode = BAD_REQUEST_STATUS;

  constructor(message: any) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

export default BadRequestError;
