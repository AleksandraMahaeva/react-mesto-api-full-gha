const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const NoAccessError = require('../errors/noAccessError');

const validationCardIdMessage = 'Переданы некорректный id карточки';
const notFoundCardMessage = 'Карточка не найдена';

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new ValidationError('Переданы некорректные данные при создании карточки'));
      else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(notFoundCardMessage);
    })
    .then((card) => {
      if (card.owner.toString() !== userId) throw new NoAccessError('Нет прав для удаления карточки');
      return Card.findByIdAndRemove(cardId).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new ValidationError('Переданы некорректные данные'));
      else next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError(notFoundCardMessage);
      else res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new ValidationError(validationCardIdMessage));
      else next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError(notFoundCardMessage);
      else res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new ValidationError(validationCardIdMessage));
      else next(err);
    });
};
