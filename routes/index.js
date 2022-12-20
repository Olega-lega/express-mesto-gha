const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validateLoginIn, validateLoginUp } = require('../utils/validation');

router.post('/signin', validateLoginIn, login);

router.post('/signup', validateLoginUp, createUser);

router.use(auth);

router.use('/users', usersRouter);

router.use('/cards', cardsRouter);

router.use((req, res, next) => next(new NotFoundError('Запрашиваемый роут не существует')));

module.exports = router;
