/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { login, createUser, logout } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);

app.use(express.json());

app.use(requestLogger);
app.use(cors({
  origin: ['https://mesto.innatsymbal.nomoredomainsrocks.ru', 'localhost:3000'],
  credentials: true,
}));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.post('/signout', auth, logout);
app.use(auth);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

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
