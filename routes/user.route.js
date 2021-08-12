var express = require('express');
var csrf = require('csurf');
var { check } = require('express-validator');

var userController = require('../controllers/user.controller');

var router = express.Router();
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', userController.signup);

router.post('/signup', [
  check('email', 'Invalid E-mail').not().isEmpty().isEmail(),
  check('password', 'Invalid password').not().isEmpty().isLength({min: 4}).withMessage('Password is too short')
  ], userController.postSignup);

router.get('/profile', userController.profile);

module.exports = router;