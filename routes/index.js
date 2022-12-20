const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { urlRegExp } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/cards', cardsRouter);

router.use('/users', usersRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Роут не найден')));

module.exports = router;
