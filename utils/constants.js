const created = 201;
const badRequest = 400;
const unauthorized = 401;
const forbidden = 403;
const notFound = 404;
const conflict = 409;
const serverError = 500;

const urlRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

module.exports = {
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
  urlRegExp,
};
