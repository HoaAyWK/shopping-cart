require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo');

var productRoute = require('./routes/product.route');
var userRoute = require('./routes/user.route');
var cartRoute = require(('./routes/cart.route'));

var app = express();
var port = 3000;

const clientPromise = mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true})
    .then(prm => prm.connection.getClient());

require('./config/passport');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ clientPromise: clientPromise }),
    cookies: { maxAge: 120 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.signin = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});
app.use('/', productRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});