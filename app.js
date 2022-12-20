const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlewares/middlewares');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use(routes);

app.use(errorsHandler);

app.use(errors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
