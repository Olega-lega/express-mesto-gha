const router = require('express').Router();

const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserId, validateUser, validateAvatar } = require('../utils/validation');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', validateUserId, getUser);

router.patch('/me', validateUser, updateProfile);

router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
