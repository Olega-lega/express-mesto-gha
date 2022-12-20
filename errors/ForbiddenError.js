const { FORBIDEN_ERROR_MESSAGE } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDEN_ERROR_MESSAGE;
  }
}

module.exports = ForbiddenError;
