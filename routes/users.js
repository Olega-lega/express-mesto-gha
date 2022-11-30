const router = require('express').Router();
const {
  getUsers, createUser, getUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
