var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('/db');

passport.use(new localStrategy(function verify(username, password, callback) {
    
}));

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;