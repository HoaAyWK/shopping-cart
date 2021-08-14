var express = require('express');
var csrf = require('csurf');
var { check } = require('express-validator');

var userController = require('../controllers/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', authMiddleware.isSignedIn, userController.profile);
router.get('/signout', authMiddleware.isSignedIn, userController.signout);
router.use('/', authMiddleware.notSignedIn, (req, res, next) => {next()});
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post('/signup', [
  check('email', 'Invalid E-mail').not().isEmpty().isEmail(),
  check('password', 'Invalid password').not().isEmpty()
  .isLength({min: 4}).withMessage('Password is too short')
  ], userController.postSignup, userController.redirectOption);
router.post('/signin', [
  check('email', 'Invalid E-mail').not().isEmpty().isEmail(),
  check('password', 'Invalid password').not().isEmpty()
  ], userController.postSignin, userController.redirectOption);

module.exports = router;