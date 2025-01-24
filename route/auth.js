var express = require('express');
var router = express.Router();

router.get('/login', function(res, req, next) {
    res.render('login');
});

module.exports = router;