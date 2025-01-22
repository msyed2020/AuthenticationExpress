require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var sesh = require('express-session');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var SQLiteStorage = require('connect-sqlite3')(session);

var app = express();

app.locals.pluralize = require('pluralize');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname, 'public')));
// a session secret used to compute
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStorage({db: 'sessionStorage.db', dir: './var/dir'})
}));

app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
    var messages = req.session.messages || [];
    res.locals.messages = messages;
    res.locals.hasMessages = !! messages.length;
    req.session.messages = [];
    next();
})

// 404 error handling
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;