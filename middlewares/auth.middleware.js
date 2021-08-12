module.exports.isSignedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    res.redirect('/');
};

module.exports.notSignedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    res.redirect('/');
};
