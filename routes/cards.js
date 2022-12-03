const router = require('express').Router();
const {
  getCards, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.put('/:id/likes', likeCard);

router.delete('/:id/likes', dislikeCard);

router.delete('/:id', deleteCard);

module.exports = router;
