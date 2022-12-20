const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
<<<<<<< HEAD
const serverErrorMiddleware = require('./middlewares/serverErrorMiddleware');
=======
const errorsHandler = require('./middlewares/middlewares');
>>>>>>> parent of 684cace (main/ fix ошибок)

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use(routes);

<<<<<<< HEAD
app.use(serverErrorMiddleware);
=======
app.use(errorsHandler);
>>>>>>> parent of 684cace (main/ fix ошибок)

app.use(errors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
