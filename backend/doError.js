module.exports.doError = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};
