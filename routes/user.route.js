var express = require('express');
var csrf = require('csurf');
var { check } = require('express-validator');

var userController = require('../controllers/user.controller');

var router = express.Router();
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/profile', userController.profile);

router.post('/signup', [
  check('email', 'Invalid E-mail').not().isEmpty().isEmail(),
  check('password', 'Invalid password').not().isEmpty().isLength({min: 4}).withMessage('Password is too short')
  ], userController.postSignup);
router.post('/signin', [
  check('email', 'Invalid E-mail').not().isEmpty().isEmail(),
  check('password', 'Invalid password').not().isEmpty()
  ], userController.postSignin);

module.exports = router;