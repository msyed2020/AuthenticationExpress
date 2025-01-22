var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');

mkdirp.sync('./var/db');

var db = new sqlite3.Database('./var/db/exer.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users ( \
        id INTEGER PRIMARY KEY, \
        username TEXT UNIQUE, \
        hashed_passwordf BLOB, \
        salt BLOB, \
        name TEXT, \
        email TEXT UNIQUE, \
        email_verified INTEGER \
    )");

    db.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
        id INTEGER PRIMARY KEY, \
        user_id INTEGER NOT NULL, \
        provider TEXT NOT NULL, \
        subject TEXT NOT NULL, \
        UNIQUE(provider, subject) \
    )");

    db.run("CREATE TABLE IF NOT EXISTS user ( \
        id INTEGER PRIMARY KEY, \
        owner_id INTEGER NOT NULL, \
        title TEXT NOT NULL, \
        completed INTEGER \
    )");
});

module.exports = db;