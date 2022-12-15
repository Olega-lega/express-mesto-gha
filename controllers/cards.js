const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const {
  success,
  created,
} = require('../utils/constants');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.json(cards);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createCard = async (req, res, next) => {
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
      next(new BadRequestError(`При создании карточки, переданы некорректные данные. ${errors.join(', ')}`));
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndRemove(id);
    if (!query) {
      next(new NotFoundError('Карточка c указанным id не найдена!'));
    }
    if (JSON.stringify(query.owner) !== JSON.stringify(req.user._id)) {
      await Card.findByIdAndRemove(id);
      return res.status(success).json({ message: 'Карточка удалена' });
    }
    next(new BadRequestError('Недостаточно прав для удаления указанной карточки.'));
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный id карточки!'));
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!query) {
      return next(new NotFoundError('Карточка c указанным id не найдена!'));
    }
    return res.status(created).json(query);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      next(new BadRequestError('Введены некорректные данные для постановки лайка.'));
    }
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!query) {
      return next(new NotFoundError('Карточка c указанным id не найдена!'));
    }
    return res.status(success).json(query);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      next(new BadRequestError('Введены некорректные данные для снятия лайка!'));
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
