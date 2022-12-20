const { unauthorized } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorized;
  }
}

module.exports = UnauthorizedError;
