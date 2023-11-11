const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUser, login, logout } = require('../controllers/users');

const { validateLogin, validateCreateUser } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.get('/signout', auth, logout);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует.'));
});

module.exports = router;
