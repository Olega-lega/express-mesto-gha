const { notFound } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}

module.exports = NotFoundError;
