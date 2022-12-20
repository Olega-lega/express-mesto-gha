const router = require('express').Router();

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const { validateCreatCard, validateCardId } = require('../utils/validation');

router.get('/', getCards);

router.post('/', validateCreatCard, createCard);

router.put('/:id/likes', validateCardId, likeCard);

router.delete('/:id/likes', validateCardId, deleteCard);

router.delete('/:id', validateCardId, dislikeCard);

module.exports = router;
