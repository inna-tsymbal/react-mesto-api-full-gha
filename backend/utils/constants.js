module.exports.REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const { NODE_ENV, SECRET_KEY } = process.env;

const SECRET_KEY_DEV = 'dev-secret-key';

module.exports = {
  SECRET_KEY,
  SECRET_KEY_DEV,
  NODE_ENV,
};
