/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB');
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('Такая страница не существует.')));
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка.' } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
