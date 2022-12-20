const { conflict } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflict;
  }
}

module.exports = ConflictError;
