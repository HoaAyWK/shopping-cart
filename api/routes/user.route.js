var express = require('express');

var userController = require('../controllers/user.controller');

var router = express.Router();

router.post('/signup', userController.postSignup);
router.post('/signin', userController.postSignin);

module.exports = router;