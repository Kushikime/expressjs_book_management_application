const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('../routes/router');

const app = express();

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(express.static('public'));
app.use(express.static('views'));

app.use('/', router);

module.exports = app;
