const { celebrate, Joi, errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { default: validator } = require('validator');
const { doError } = require('./doError');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());
app.use(express.urlencoded());

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
app.use(errors());
app.use(doError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
