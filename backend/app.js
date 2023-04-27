const { celebrate, Joi, errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { default: validator } = require('validator');
const cors = require('cors')
const { doError } = require('./doError');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3001 } = process.env;

const app = express();
// app.use(cors({
//   // origin: 'http://localhost:3000',
//   origin: 'https://aleksandram.nomoredomains.monster',
//   credentials: true,
// }));
// app.use(cors({credentials: true}));

const options = {  
  origin: [    
    'https://aleksandram.nomoredomains.monster',    
    // 'https://ВАШ ДОМЕЙН С ДОКУМЕНТА',    
    // 'https://YOUR.github.io',  
  ],  
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  
  preflightContinue: false,  
  optionsSuccessStatus: 204,  
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],  
  credentials: true,
};

app.use('*', cors(options));


mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(express.json());
app.use(cookieParser());
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
