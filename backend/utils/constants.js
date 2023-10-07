module.exports.REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const URL_MONGO = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;
const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports.SECRET_KEY = SECRET_KEY;
module.exports.URL_MONGO = URL_MONGO;
module.exports.PORT = PORT;
