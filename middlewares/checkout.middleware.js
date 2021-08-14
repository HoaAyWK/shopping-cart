module.exports.isSignedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = '/cart'+req.url;
    res.redirect('/user/signin');
};