var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('/db');

passport.use(new localStrategy(function verify(username, password, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
        if (err) {
            return callback(err);
        }
        if (!row) {
            return callback(null, false, {message: "Incorrect username or password"});
        }
    })
}));

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;