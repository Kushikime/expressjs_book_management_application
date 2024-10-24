const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const router = require('../routes/router');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(errorHandler);

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(express.static('public'));
app.use(express.static('views'));

app.use('/', router);

function errorHandler(err, req, res, next) {
  console.log('HERE');
  res.status(500);
  res.render('error', { error: err });
}

module.exports = app;
