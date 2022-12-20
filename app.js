const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const serverErrorMiddleware = require('./middlewares/serverErrorMiddleware');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use(routes);

app.use(serverErrorMiddleware);

app.use(errors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
  });
});
