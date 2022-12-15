const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const { created } = require('../utils/constants');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      password: hash,
    });
    return res.status(created).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      next(new BadRequestError(`Введены некорректные данные при создании пользователя. ${errors.join(
        ', ',
      )}`));
    }
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с указанным email уже зарегестрирован!'));
    }
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      next(new BadRequestError('Введен некорректный id пользователя.'));
    }
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError('Пользователь не найден!'));
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      next(new BadRequestError(`Введен некорректные данные при обновлении профиля. ${errors.join(
        ', ',
      )}`));
    } if (err.name === 'CastError') {
      next(new BadRequestError('Введен некорректный id пользователя.'));
    }
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError('Пользователь не найден!'));
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      next(new BadRequestError(`Введены некорректные данные при обновлении аватара. ${errors.join(', ')}`));
    } if (err.name === 'CastError') {
      next(new BadRequestError('Введен некорректный id пользователя.'));
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
};
