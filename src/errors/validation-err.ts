import { VALIDATION_ERROR_STATUS } from "../utils/constants";

class ValidationError extends Error {
  statusCode = VALIDATION_ERROR_STATUS;

  constructor(message: any) {
    super(message);
    this.statusCode = VALIDATION_ERROR_STATUS;
  }
}

export default ValidationError;
