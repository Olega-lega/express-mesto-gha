const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_MESSAGE;
  }
}

module.exports = UnauthorizedError;
