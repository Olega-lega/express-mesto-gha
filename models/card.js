const mongoose = require('mongoose');
const { urlRegExp } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(e) {
        return urlRegExp(e);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const card = mongoose.model('card', cardSchema);

module.exports = card;
