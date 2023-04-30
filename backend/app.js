require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { default: validator } = require('validator');
const cors = require('cors')
const { doError } = require('./doError');
const { login, createUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const options = {
  origin: [
    'https://aleksandram.nomoredomains.monster',
    'http://localhost:3001',
    'https://github.com/AleksandraMahaeva/react-mesto-api-full-gha',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => (validator.isURL(value) ? value : helpers.message('Заполните поле валидным URL'))),
  }),
}), createUser);

app.use(auth);

app.use(require('./routes/user'));

app.use(require('./routes/card'));

app.use('*', () => {
  throw new NotFoundError('Был запрошен несуществующий адрес');
});

app.use(errorLogger);
app.use(errors());
app.use(doError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
