var passport = require('passport');
var User = require('../models/user.model');
var Order = require('../models/order.model');
var Cart = require('../models/cart.model');

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

module.exports.signout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

module.exports.profile = (req, res, next) => {
    Order.find({user: req.user}, (err, orders) => {
        if (err) return res.write('Error!');
        orders.forEach(order => {
            var cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders});
    });
};

module.exports.postSignup = passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
});

module.exports.postSignin = passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
});

module.exports.redirectOption = (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
};

