const Card = require('../models/card');
const {
  created,
  badRequest,
  notFound,
  serverError,
} = require('../utils/constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.json(cards);
  } catch (err) {
    console.error(err);
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const newCard = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    return res.status(created).json(newCard);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(badRequest).json({ message: `При создании карточки, переданы некорректные данные. ${errors.join(', ')}` });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndRemove(id);
    if (!query) {
      return res.status(notFound).json({ message: 'Карточка c указанным id не найдена' });
    }
    return res.json({ message: 'Карточка удалена' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(badRequest).json({ message: 'Передан некорректный id карточки.' });
    }
    return res.status(serverError).json({ message: 'Произошла ошибка' });
  }
};

const likeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!query) {
      return res
        .status(notFound)
        .json({ message: 'Карточка c указанным id не найдена' });
    }
    return res.json({ message: 'Лайк добавлен' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(badRequest).json({ message: 'Введены некорректные данные для постановки лайка.' });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!query) {
      return res
        .status(notFound)
        .json({ message: 'Карточка c указанным id не найдена' });
    }
    return res.json({ message: 'Лайк удален' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(badRequest).json({ message: 'Введенны некорректны данные для снятия лайка.' });
    }
    return res
      .status(serverError)
      .json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
