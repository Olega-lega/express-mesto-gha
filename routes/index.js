const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateLoginIn, validateLoginUp } = require('../utils/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLoginIn, login);

router.post('/signup', validateLoginUp, createUser);

router.use(auth);

router.use('/cards', cardsRouter);

router.use('/users', usersRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Роут не найден')));

module.exports = router;
