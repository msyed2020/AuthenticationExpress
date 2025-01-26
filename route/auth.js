var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');

passport.use(new localStrategy(function verify(username, password, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
        if (err) {
            return callback(err);
        }
        if (!row) {
            return callback(null, false, {message: "Incorrect username or password"});
        }
    
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) {
            return callback(err);
        }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return callback(null, false, {message: "Incorrect username or password"});
        }
        return callback(null, row);
    });

    });
}));

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;