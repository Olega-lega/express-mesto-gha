const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_MESSAGE;
  }
}

module.exports = BadRequestError;
