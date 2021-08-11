require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var productRoute = require('./routes/product.route');

var app = express();

var port = 3000;

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', productRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});