class BadRequestError extends Error {
  statusCode = 400;

  constructor(message: any) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
