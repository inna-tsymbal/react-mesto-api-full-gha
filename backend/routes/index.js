const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует.'));
});

module.exports = router;
