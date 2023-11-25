import { NOT_FOUND_STATUS } from "../utils/constants";

class NotFoundError extends Error {
  statusCode = NOT_FOUND_STATUS;

  constructor(message: any) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

export default NotFoundError;
