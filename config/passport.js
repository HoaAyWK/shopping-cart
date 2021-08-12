var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator');

var User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    (req, email, password, done) => {
        var errors = validationResult(req).array();
        var messages = [];
        if (errors.length > 0) {
            errors.forEach(error => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        User.findOne({email: email}, (err, user) => {
            if (err) return done(err);
            if (user) return done(null, false, {message: 'Email is already in use.'});
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save((err, result) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        });
    }
));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    (req, email, password, done) => {
        var errors = validationResult(req).array();
        var messages = [];
        if (errors.length > 0) {
            errors.forEach(error => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        User.findOne({email: email}, (err, user) => {
            if (err) return done(err);
            if (!user)
                return done(null, false, {message: 'User does not exist.'});
            if (!user.validPassword(password, user.password))
                return done(null, false, {message: 'Wrong password.'});
            return done(null, user);
        });
    }
));
