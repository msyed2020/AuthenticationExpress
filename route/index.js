var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/index', function(req, res, next) {
    res.locals.filter = null;
    res.render('index');
});

router.get('/', function(req, res) {
    res.render('home');
});

module.exports = router;