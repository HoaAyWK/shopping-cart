var passport = require('passport');
var User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signup',
        {csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

module.exports.signin = (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signin',
        {csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

module.exports.postSignup = passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
});

module.exports.postSignin = passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
});

module.exports.profile = (req, res, next) => {
    res.render('user/profile');
};