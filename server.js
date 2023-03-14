var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), 'express/.env') });
var session  = require('express-session');
var flash = require('connect-flash');

var routes = require('./express/routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));
app.use(flash());
app.use('/api', routes);

module.exports = app;
