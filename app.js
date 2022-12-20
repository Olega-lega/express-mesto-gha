const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const serverErrorMiddleware = require('./middlewares/serverErrorMiddleware');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

app.use(express.json());

app.use(helmet());

app.use(routes);

app.use(errors());

app.use(serverErrorMiddleware);
