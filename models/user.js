const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegExp } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(e) {
        return urlRegExp.test(e);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
  },
});

const user = mongoose.model('card', userSchema);

module.exports = user;
