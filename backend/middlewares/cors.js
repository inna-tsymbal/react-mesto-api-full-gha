/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://mesto.innatsymbal.nomoredomainsrocks.ru',
  'http://mesto.innatsymbal.nomoredomainsrocks.ru',
  'https://api.mesto.innatsymbal.nomoredomainsrocks.ru',
  'http://api.mesto.innatsymbal.nomoredomainsrocks.ru',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    return res.end();
  }

  return next();
};