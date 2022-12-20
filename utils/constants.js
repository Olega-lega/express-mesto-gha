const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

const urlRegExp = (value) => {
  // eslint-disable-next-line no-useless-escape
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm.test(value);
};

module.exports = {
  created,
  badRequest,
  notFound,
  serverError,
  urlRegExp,
};
