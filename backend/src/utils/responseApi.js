class ResponseApi {
  constructor(success, message, data, statusCode = 200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static success(data = null) {
    return new ResponseApi(true, null, data);
  }

  static error(error, data = null) {
    const message =
      error.message ||
      error.sqlMessage ||
      error.name ||
      "Internal server error";
    const statusCode = error.statusCode || 500;

    return new ResponseApi(false, message, data, statusCode);
  }

  toJson() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}

module.exports = ResponseApi;
