const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('./constants');

const validateCurrentUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp).required(),
  }),
});

const validateNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(urlRegExp).required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
});

const validateLoginIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
const validateLoginUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCurrentUser,
  validateUser,
  validateUserId,
  validateAvatar,
  validateNewCard,
  validateCardId,
  validateLoginIn,
  validateLoginUp,
};
