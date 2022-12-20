const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
<<<<<<< HEAD
const { urlRegExp } = require('../utils/constants');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(urlRegExp).required(),
  }),
}), createCard);
=======

const { validateNewCard, validateCardId } = require('../utils/validation');

router.get('/', getCards);

router.post('/', validateNewCard, createCard);
>>>>>>> parent of 684cace (main/ fix ошибок)

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
