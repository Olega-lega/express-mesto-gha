const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: `Переданы некорректные данные при создании пользователя. ${errors.join(', ')}` });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Некорректный id пользователя.' });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { name: req.body.name, about: req.body.about }, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: `Переданы некорректные данные при обновлении профиля. ${errors.join(', ')}` });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { avatar: req.body.avatar }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: `Переданы некорректные данные при обновлении аватара. ${errors.join(', ')}` });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers, createUser, getUser, updateProfile, updateAvatar,
};
