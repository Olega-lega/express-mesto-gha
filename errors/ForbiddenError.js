const { forbidden } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbidden;
  }
}

module.exports = ForbiddenError;
