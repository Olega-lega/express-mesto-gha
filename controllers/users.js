const User = require('../models/user');
const {
  created,
  badRequest,
  notFound,
  serverError,
} = require('../utils/constants');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    return res.status(created).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(badRequest).json({
        message: `Введены некорректные данные при создании пользователя. ${errors.join(
          ', ',
        )}`,
      });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(notFound)
        .json({ message: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res
        .status(badRequest)
        .json({ message: 'Введен некорректный id пользователя.' });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const updateProfile = async (req, res) => {
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
      return res
        .status(notFound)
        .json({ message: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(badRequest).json({
        message: `Введен некорректные данные при обновлении профиля. ${errors.join(
          ', ',
        )}`,
      });
    } if (err.name === 'CastError') {
      return res
        .status(badRequest)
        .json({ message: 'Введен некорректный id пользователя.' });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
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
      return res
        .status(notFound)
        .json({ message: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(badRequest).json({
        message: `Введены некорректные данные при обновлении аватара. ${errors.join(
          ', ',
        )}`,
      });
    } if (err.name === 'CastError') {
      return res
        .status(badRequest)
        .json({ message: 'Введен некорректный id пользователя.' });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
};
