const jwt = require('jsonwebtoken');
const AuthorizError = require('../errors/authorizError');

module.exports = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) throw new AuthorizError('Необходима авторизация');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthorizError('Необходима авторизация');
  }

  req.user = payload;
  return next();
};
