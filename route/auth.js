// AUTHENTICATION IS NOT WORKING. NEED TO FIX

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

passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
        return callback(null, {id: user.id, username: user.username, name: user.name});
    });
});

passport.deserializeUser(function(user, callback) {
    process.nextTick(function() {
        return callback(null, user);
    });
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router; // perhaps inspect this when testing. File may not work