// Clases para el manejo de errores HTTP

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
module.exports = { HttpError, NotFoundError, BadRequestError };
