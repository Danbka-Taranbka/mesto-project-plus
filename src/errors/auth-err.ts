class AuthenticationError extends Error {
  statusCode = 401;

  constructor(message: any) {
    super(message);
    this.statusCode = 401;
  }
}

export default AuthenticationError;
