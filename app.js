require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var SQLiteStorage = require('connect-sqlite3')(session);

var app = express();

app.locals.pluralize = require('pluralize');

module.exports = app;