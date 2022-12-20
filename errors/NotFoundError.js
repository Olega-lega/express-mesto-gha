const { NOT_FOUND__MESSAGE } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND__MESSAGE;
  }
}

module.exports = NotFoundError;
