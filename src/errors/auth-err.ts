import { UNAUTHORIZED_STATUS } from "../utils/constants";

class AuthenticationError extends Error {
  statusCode = UNAUTHORIZED_STATUS;

  constructor(message: any) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS;
  }
}

export default AuthenticationError;
