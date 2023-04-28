const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { default: validator } = require('validator');
const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => (validator.isURL(value) ? value : helpers.message('Заполните поле валидным URL'))),
  }),
}), updateUserAvatar);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
}), getUser);

module.exports = router;
