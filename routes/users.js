const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateCurrentUser,
  validateUser,
  validateUserId,
  validateAvatar,
} = require('../utils/validation');

router.get('/', getUsers);

router.get('/me', validateCurrentUser, getCurrentUser);

router.get('/:id', validateUserId, getUser);

router.patch('/me', validateUser, updateProfile);

router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
