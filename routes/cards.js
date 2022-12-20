const router = require('express').Router();

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const { validateNewCard, validateCardId } = require('../utils/validation');

router.get('/', getCards);

router.post('/', validateNewCard, createCard);

router.put('/:id/likes', validateCardId, likeCard);

router.delete('/:id/likes', validateCardId, deleteCard);

router.delete('/:id', validateCardId, dislikeCard);

module.exports = router;
