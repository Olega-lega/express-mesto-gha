const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegExp } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
    default: 'Это Тед',
  },
  about: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
    default: 'Плюшевый мишка',
  },
  avatar: {
    type: String,
    validate: {
<<<<<<< HEAD
      validator(e) {
        return urlRegExp.test(e);
=======
      validator(url) {
        return urlRegExp(url);
>>>>>>> parent of 684cace (main/ fix ошибок)
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: false,
    default: 'https://clck.ru/333WpV',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(string) {
        return isEmail(string);
      },
      message: 'Укажите корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 2,
  },

});

const user = mongoose.model('user', userSchema);

module.exports = user;
