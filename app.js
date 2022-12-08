const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { httpStatusCodes } = require('./utils/constants');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '6384601d3321b92c4ebc820e',
  };
  next();
});

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

app.use('*', (req, res) => res
  .status(httpStatusCodes.notFound)
  .json({ message: 'Ошибка: запрос не существует' }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}!`);
    });
  },
);
