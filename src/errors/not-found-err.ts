class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: any) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
