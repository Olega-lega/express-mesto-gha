const { CONFLICT_MESSAGE } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_MESSAGE;
  }
}

module.exports = ConflictError;
